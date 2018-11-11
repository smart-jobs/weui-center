import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/create_user',
      component: () => import(/* webpackChunkName: "corp_user_form" */ './views/UserForm.vue'),
    },
    {
      path: '/register',
      component: () => import(/* webpackChunkName: "corp_register" */ './views/Register.vue'),
      children: [
        {
          path: 'step1',
          component: () => import(/* webpackChunkName: "corp_register_step1" */ './views/Step1.vue'),
        },
        {
          path: 'step2',
          component: () => import(/* webpackChunkName: "corp_register_step2" */ './views/Step2.vue'),
        },
        {
          path: 'step3',
          component: () => import(/* webpackChunkName: "corp_register_step3" */ './views/Step3.vue'),
        },
      ],
    },
  ],
});

export default router;
