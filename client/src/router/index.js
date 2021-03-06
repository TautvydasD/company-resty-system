import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Catalogue from '../views/Catalogue.vue';
import Users from '../views/Users.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component() {
      return import(/* webpackChunkName: "about" */ '../views/About.vue');
    },
  },
  {
    path: '/catalogue',
    name: 'Catalogue',
    component: Catalogue,
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
