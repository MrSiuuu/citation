import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddQuoteView from '../views/AddQuoteView.vue'
import DeleteQuoteView from '../views/DeleteQuoteView.vue'
import AdminLoginView from '../views/AdminLoginView.vue'
import AdminView from '../views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/contribute',
      name: 'contribute',
      component: AddQuoteView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/delete',
      name: 'delete',
      component: DeleteQuoteView,
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLoginView,
    },
    {
      path: '/quote/:id',
      name: 'quote',
      component: () => import('../views/QuoteView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('admin_authenticated') === 'true';
        const hasDashboardAccess = sessionStorage.getItem('dashboard_access') === 'true';
        
        // Vérifier si l'accès dashboard est encore valide (10 minutes)
        if (hasDashboardAccess) {
          const timestamp = parseInt(sessionStorage.getItem('dashboard_timestamp') || '0');
          const now = Date.now();
          const tenMinutes = 10 * 60 * 1000;
          
          if (timestamp && (now - timestamp) >= tenMinutes) {
            // Expiré
            sessionStorage.removeItem('dashboard_access');
            sessionStorage.removeItem('dashboard_timestamp');
            next('/admin/login');
            return;
          }
        }
        
        if (isAuthenticated || hasDashboardAccess) {
          next();
        } else {
          next('/admin/login');
        }
      }
    },
  ],
})

export default router
