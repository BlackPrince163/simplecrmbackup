import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from "../views/SignUp";
import LogIn from "@/views/LogIn";
import Dashboard from "../views/dashboard/Dashboard";
import MyAccount from "../views/dashboard/MyAccount";
import Leads from "../views/dashboard/Leads";
import AddLead from "../views/dashboard/AddLead";
import Lead from "../views/dashboard/Lead";
import EditLead from "../views/dashboard/EditLead";
import AddTeam from "../views/dashboard/AddTeam";
import Team from "../views/dashboard/Team";
import AddMember from "../views/dashboard/AddMember";
import Clients from "../views/dashboard/Clients";
import AddClient from "../views/dashboard/AddClient";
import Client from "../views/dashboard/Client";
import store from "@/store";
import EditClient from "@/views/dashboard/EditClient";

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
        path: '/dashboard/add-team',
        name: 'AddTeam',
        component: AddTeam,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/dashboard/team',
        name: 'Team',
        component: Team,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/dashboard/team/add-member',
        name: 'AddMember',
        component: AddMember,
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
        path: '/dashboard/leads/:id',
        name: 'Lead',
        component: Lead,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/dashboard/leads/:id/edit',
        name: 'EditLead',
        component: EditLead,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/dashboard/clients',
        name: 'Clients',
        component: Clients,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/dashboard/clients/add',
        name: 'AddClient',
        component: AddClient,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/dashboard/clients/:id',
        name: 'Client',
        component: Client,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/dashboard/clients/:id/edit',
        name: 'EditClient',
        component: EditClient,
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
