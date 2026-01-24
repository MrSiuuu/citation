import express from 'express';
import cors from 'cors';
import { readFile, writeFile, rename, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const DATA_DIR = process.env.DATA_DIR || join(__dirname, 'data');
const CITATIONS_FILE = join(DATA_DIR, 'citations.json');
const CATEGORIES_FILE = join(DATA_DIR, 'categories.json');

const SEED_CITATIONS_FILE = join(__dirname, 'seed', 'citations.json');
const SEED_CATEGORIES_FILE = join(__dirname, 'seed', 'categories.json');

const app = express();

// --- middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json({ limit: '1mb' }));

// --- simple write lock (avoid concurrent JSON corruption)
let writeQueue = Promise.resolve();
function withWriteLock(fn) {
  const next = writeQueue.then(fn, fn);
  writeQueue = next.catch(() => {});
  return next;
}

async function atomicWriteJson(filePath, data) {
  const tmp = `${filePath}.tmp`;
  await writeFile(tmp, JSON.stringify(data, null, 2), 'utf-8');
  await rename(tmp, filePath);
}

async function ensureDataFiles() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }

  if (!existsSync(CITATIONS_FILE)) {
    if (existsSync(SEED_CITATIONS_FILE)) {
      const seed = JSON.parse(await readFile(SEED_CITATIONS_FILE, 'utf-8'));
      await atomicWriteJson(CITATIONS_FILE, Array.isArray(seed) ? seed : []);
      console.log('✅ citations.json seedé');
    } else {
      await atomicWriteJson(CITATIONS_FILE, []);
      console.log('✅ citations.json créé (vide)');
    }
  }

  if (!existsSync(CATEGORIES_FILE)) {
    if (existsSync(SEED_CATEGORIES_FILE)) {
      const seed = JSON.parse(await readFile(SEED_CATEGORIES_FILE, 'utf-8'));
      await atomicWriteJson(CATEGORIES_FILE, Array.isArray(seed) ? seed : []);
      console.log('✅ categories.json seedé');
    } else {
      await atomicWriteJson(CATEGORIES_FILE, []);
      console.log('✅ categories.json créé (vide)');
    }
  }
}

async function readJsonArray(filePath) {
  try {
    const raw = await readFile(filePath, 'utf-8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function readCitations() {
  return await readJsonArray(CITATIONS_FILE);
}
async function readCategories() {
  return await readJsonArray(CATEGORIES_FILE);
}

function normalizeString(s) {
  return String(s || '').trim();
}

// --- routes
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Quotes
app.get('/api/quotes', async (req, res) => {
  const citations = await readCitations();
  res.json(citations);
});

app.get('/api/quotes/random', async (req, res) => {
  const citations = await readCitations();
  if (!citations.length) return res.status(404).json({ error: 'Aucune citation disponible' });
  const idx = Math.floor(Math.random() * citations.length);
  res.json(citations[idx]);
});

app.get('/api/quotes/:id', async (req, res) => {
  const id = Number(req.params.id);
  const citations = await readCitations();
  const quote = citations.find((q) => Number(q.id) === id);
  if (!quote) return res.status(404).json({ error: 'Citation non trouvée' });
  res.json(quote);
});

app.post('/api/quotes', async (req, res) => {
  const text = normalizeString(req.body?.text);
  const author = normalizeString(req.body?.author);
  const category = normalizeString(req.body?.category) || 'Autre';

  if (!text || !author) return res.status(400).json({ error: "Le texte et l'auteur sont requis" });

  const created = await withWriteLock(async () => {
    const citations = await readCitations();
    const maxId = citations.reduce((m, q) => Math.max(m, Number(q.id) || 0), 0);
    const newQuote = {
      id: maxId + 1,
      text,
      author,
      category,
      views: 0,
      createdAt: new Date().toISOString(),
    };
    citations.push(newQuote);
    await atomicWriteJson(CITATIONS_FILE, citations);
    return newQuote;
  });

  res.status(201).json(created);
});

app.put('/api/quotes/:id', async (req, res) => {
  const id = Number(req.params.id);
  const text = normalizeString(req.body?.text);
  const author = normalizeString(req.body?.author);
  const category = normalizeString(req.body?.category);

  const updated = await withWriteLock(async () => {
    const citations = await readCitations();
    const idx = citations.findIndex((q) => Number(q.id) === id);
    if (idx === -1) return null;

    citations[idx] = {
      ...citations[idx],
      ...(text ? { text } : {}),
      ...(author ? { author } : {}),
      ...(category ? { category } : {}),
      updatedAt: new Date().toISOString(),
    };
    await atomicWriteJson(CITATIONS_FILE, citations);
    return citations[idx];
  });

  if (!updated) return res.status(404).json({ error: 'Citation non trouvée' });
  res.json(updated);
});

app.delete('/api/quotes/:id', async (req, res) => {
  const id = Number(req.params.id);

  const ok = await withWriteLock(async () => {
    const citations = await readCitations();
    const next = citations.filter((q) => Number(q.id) !== id);
    if (next.length === citations.length) return false;
    await atomicWriteJson(CITATIONS_FILE, next);
    return true;
  });

  if (!ok) return res.status(404).json({ error: 'Citation non trouvée' });
  res.json({ success: true });
});

app.post('/api/quotes/:id/views', async (req, res) => {
  const id = Number(req.params.id);

  const updated = await withWriteLock(async () => {
    const citations = await readCitations();
    const idx = citations.findIndex((q) => Number(q.id) === id);
    if (idx === -1) return null;
    citations[idx].views = (Number(citations[idx].views) || 0) + 1;
    await atomicWriteJson(CITATIONS_FILE, citations);
    return citations[idx];
  });

  if (!updated) return res.status(404).json({ error: 'Citation non trouvée' });
  res.json(updated);
});

// Categories
app.get('/api/categories', async (req, res) => {
  const categories = await readCategories();
  res.json(categories);
});

app.post('/api/categories', async (req, res) => {
  const name = normalizeString(req.body?.name);
  if (!name) return res.status(400).json({ error: 'Le nom de la catégorie est requis' });

  const categories = await withWriteLock(async () => {
    const cats = await readCategories();
    if (cats.includes(name)) return cats;
    const next = [...cats, name];
    await atomicWriteJson(CATEGORIES_FILE, next);
    return next;
  });

  res.status(201).json(categories);
});

app.delete('/api/categories/:name', async (req, res) => {
  const name = normalizeString(decodeURIComponent(req.params.name));
  if (!name) return res.status(400).json({ error: 'Catégorie invalide' });

  const result = await withWriteLock(async () => {
    const cats = await readCategories();
    const next = cats.filter((c) => c !== name);
    if (next.length === cats.length) return { ok: false, next: cats };
    await atomicWriteJson(CATEGORIES_FILE, next);
    return { ok: true, next };
  });

  if (!result.ok) return res.status(404).json({ error: 'Catégorie non trouvée' });
  res.json({ success: true, categories: result.next });
});

// Authors
app.get('/api/authors', async (req, res) => {
  const citations = await readCitations();
  const authors = [...new Set(citations.map((q) => q.author).filter(Boolean))].sort();
  res.json(authors);
});

await ensureDataFiles();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend Westaf-Vibe sur le port ${PORT}`);
  console.log(`📁 Data dir: ${DATA_DIR}`);
});

