import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import HelloWorld from '@/components/HelloWorld'
import User from '@/components/User'
import SuperUser from '@/components/SuperUser'
import Super_Login from '@/components/Super_Login'
 
Vue.use(Router)
 
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/super_login',
      name: 'Super_Login',
      component: Super_Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      children:[
        {
          path: '/user/paper_search',
          name: 'paper_search',
          component: () => import('../views/paper_search/paper_search.vue')
        },
        {
          path: '/user/paper_down',
          name: 'paper_down',
          component: () => import('../views/paper_down/paper_down.vue')
        },
        {
          path: '/user/book_search',
          name: 'book_search',
          component: () => import('../views/book_search/book_search.vue')
        },
        {
          path: '/user/book_state',
          name: 'book_state',
          component: () => import('../views/book_state/book_state.vue')
        },
        {
          path: '/user/my_account',
          name: 'my_account',
          component: () => import('../views/my_account/my_account.vue')
        },
      ]
    },
    {
      path: '/superuser',
      name: 'SuperUser',
      component: SuperUser,
      children:[
        {
          path: '/superuser/Spaper_search',
          name: 'Spaper_search',
          component: () => import('../views/paper_search/Spaper_search.vue')
        },
        {
          path: '/superuser/Spaper_down',
          name: 'Spaper_down',
          component: () => import('../views/paper_down/Spaper_down.vue')
        },
        {
          path: '/superuser/Spaper_manage',
          name: 'Spaper_manage',
          component: () => import('../views/manage/Spaper_manage.vue')
        },
        {
          path: '/superuser/Sbook_search',
          name: 'Sbook_search',
          component: () => import('../views/book_search/Sbook_search.vue')
        },
        {
          path: '/superuser/Sbook_state',
          name: 'Sbook_state',
          component: () => import('../views/book_state/Sbook_state.vue')
        },
        {
          path: '/superuser/Sbook_manage',
          name: 'Sbook_manage',
          component: () => import('../views/manage/Sbook_manage.vue')
        },
        {
          path: '/superuser/Smy_account',
          name: 'Smy_account',
          component: () => import('../views/my_account/Smy_account.vue')
        },
        {
          path: '/superuser/Saccount_manage',
          name: 'Saccount_manage',
          component: () => import('../views/manage/Saccount_manage.vue')
        },
      ]
    },
  ],
  mode: "history"
})