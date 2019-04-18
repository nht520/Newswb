import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import( '@/components/Login/Login');
const Register = () => import( '@/components/Register/Register');

const Layout = () => import("@/components/Layout");
const Details = () => import("@/components/Details/Details");
//404
const For = () => import("@/components/NotFound/For");
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Layout',
      name: 'Layout',
      component: Layout
    },
    {
      path:'/Details/:id',
      name:'Details',
      component:Details
    },
    {
      path: '*',
      name: 'For',
      component: For
    }
  ]
})
