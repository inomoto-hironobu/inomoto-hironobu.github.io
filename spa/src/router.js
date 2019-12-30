import Vue from 'vue'
import VueRouter from 'vue-router'
import 物理 from './components/物理.vue';
import 消費税と投票率 from './components/消費税と投票率.vue';
import svg from './components/svg.vue';
import web from './components/web.vue';
import css from './components/css.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/消費税と投票率', component: 消費税と投票率 },
  { path: '/物理', component: 物理 },
  { path: '/svg', component: svg},
  { path: '/web', component: web},
  { path: '/css', component: css}
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

export default router;