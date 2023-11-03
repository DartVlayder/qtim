import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import BlogList from '@/components/BlogList.vue';
import BlogDetail from '@/components/BlogDetail.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'BlogList',
    component: BlogList
  },
  {
    path: '/blog/:id',
    name: 'BlogDetail',
    component: BlogDetail
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;