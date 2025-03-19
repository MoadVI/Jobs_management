import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JobDetail from '../views/JobDetail.vue'
import AddJob from '../views/AddJob.vue'
import EditJob from '../views/EditJob.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/jobs/add', name: 'add-job', component: AddJob },
  { path: '/jobs/edit', name: 'edit-job', component: EditJob },
  { path: '/jobs/:id', name: 'job-detail', component: JobDetail },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router