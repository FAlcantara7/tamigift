import { createRouter, createWebHashHistory } from 'vue-router'

const mainScreen = () => import('@/views/mainScreen/mainScreenIndex.vue')
const startScreen = () => import('@/views/startScreen/startScreen.vue')
const msgScreen = () => import('@/views/msgScreen/msgScreen.vue')

const routes = [
  {
    path: '/mainscreen',
    name: 'MainScreen',
    component: mainScreen,
    beforeEnter: (to, from, next) => {
      const token = sessionStorage.getItem('token')
      if (!token) {
        next({ name: 'StartScreen' })
      } else {
        next()
      }
    },
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'StartScreen',
    component: startScreen
  },
  {
    path: '/msgscreen',
    name: 'MsgScreen',
    component: msgScreen,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  console.log('Verificando rota:', to.name)

  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    console.log('Sem token, redirecionando para StartScreen')
    next({ name: 'StartScreen' })
  } else {
    console.log('Autorizado ou rota não requer autenticação')
    next()
  }
})

export default router
