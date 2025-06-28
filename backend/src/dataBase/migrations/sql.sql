CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quotes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT IGNORE INTO quotes (text, author) VALUES
  ('La vie est un mystère qu''il faut vivre, et non un problème à résoudre.', 'Gandhi'),
  ('Le bonheur n''est pas quelque chose de tout fait. Il vient de vos propres actions.', 'Dalaï Lama'),
  ('La seule façon de faire du bon travail est d''aimer ce que vous faites.', 'Steve Jobs'),
  ('L''échec est le fondement de la réussite.', 'Lao Tseu'),
  ('Le courage n''est pas l''absence de peur, mais la capacité de vaincre ce qui fait peur.', 'Nelson Mandela');
