import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/generales/Inicio.vue')
      },
      {
        path: '/servicios',
        component: () => import('pages/servicios/Servicios.vue')
      },
      {
        path: '/servicio/:id',
        component: () => import('pages/servicios/Servicio.vue')
      },
      {
        path: '/productos',
        component: () => import('pages/productos/Productos.vue')
      },
      {
        path: '/producto/:id',
        component: () => import('pages/productos/Producto.vue')
      },
      {
        path: '/escritorio',
        component: () => import('pages/usuario/Escritorio.vue')
      },
      {
        path: '/perfil',
        component: () => import('pages/usuario/Perfil.vue')
      },
      {
        path: '/probando',
        component: () => import('pages/Probando.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
