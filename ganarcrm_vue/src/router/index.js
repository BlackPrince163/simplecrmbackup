import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from "../views/SignUp";
import LogIn from "@/views/LogIn";
import Dashboard from "../views/dashboard/Dashboard";
import MyAccount from "../views/dashboard/MyAccount";
import Leads from "../views/dashboard/Leads";
import AddLead from "../views/dashboard/AddLead";
import store from "@/store";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/log-in',
        name: 'LogIn',
        component: LogIn
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/dashboard/my-account',
        name: 'MyAccount',
        component: MyAccount,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/dashboard/leads',
        name: 'Leads',
        component: Leads,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/dashboard/leads/add',
        name: 'AddLead',
        component: AddLead,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next('/log-in')
      this.$router.push('/log-in')
  } else {
    next()
  }
})

export default router
