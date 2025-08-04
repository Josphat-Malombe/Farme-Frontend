import { createRouter, createWebHistory } from 'vue-router'
//import { isAuthenticated } from '@/utils/auth'



import HomeView from '../views/HomeView.vue'
import Login from '@/views/auth/Login.vue'
import RegisterPage from '@/views/auth/RegisterPage.vue'
import TextChat from '@/views/TextChat.vue'
import ChatHistory from '@/components/chat/ChatHistory.vue'
import SpeechText from '@/views/SpeechText.vue'
import ProfileView from '@/views/ProfileView.vue'
import WeatherView from '@/views/WeatherView.vue'
import MainLayout from '@/layouts/MainLayout.vue'

import IndexPage from '@/components/IndexPage.vue'




const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {path: '',name:'landing',component: IndexPage},
    ]
    
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {requiresAuth: true}
  },
  {
    path: '/auth/login',
    name: 'login',
    component: Login,
    meta: {guest: true},
    
  },
    {
    path: '/auth/register',
    name: 'register',
    component: RegisterPage,
    meta: {guest: true},
    
  },
  


  {
    
    path: '/chat/:sessionId',
    name: 'continue-session',
    component: TextChat,
    props: true,
    meta:{requiresAuth: true}

  },
  {
    path: '/speech-chat/',
    name: 'speech',
    component: SpeechText,
    props: true,
    meta: {requiresAuth: true}

  },
  {
    path:'/profile',
    name: 'profile',
    component: ProfileView,
    meta: {requiresAuth: true}

  },
  {
    path: '/weather',
    name: 'weather',
    component: WeatherView,
    meta: {requiresAuth: true}
  },

  {
    path: '/history',
    name: 'history',
    component: ChatHistory,
    meta:{requiresAuth: true}

  },
    {
    path: '/:pathMatch(.*)*',
    redirect: '/auth/login'
    
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const publicPages = ['/', '/auth/login', '/auth/register']
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access')
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !token) {
    next('/')
  } else if ((to.path === '/auth/login' || to.path === '/auth/register' ||to.path==='/') && token) {
    next('/home') 
  } else {
    next()
  }
})


export default router
