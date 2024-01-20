import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import BlogsView from '../views/BlogsView.vue'
import BlogsDetailView from '../views/BlogsDetailView.vue'
import BlogsEditView from '../views/BlogsEditView.vue'


const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: {name: "Login"}
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: BlogsView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogsDetailView
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    component: BlogsEditView
  },
  {
    path: '/blog/add',
    name: 'BlogEdit',
    component: BlogsEditView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
