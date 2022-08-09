import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from "../views/SignUp";
import LogIn from "@/views/LogIn";
import Dashboard from "../views/dashboard/Dashboard";
import MyAccount from "../views/dashboard/MyAccount";
import Leads from "../views/dashboard/leads/Leads";
import AddLead from "../views/dashboard/leads/AddLead";
import Lead from "../views/dashboard/leads/Lead";
import EditLead from "../views/dashboard/leads/EditLead";
import AddTeam from "../views/dashboard/teams/AddTeam";
import Team from "../views/dashboard/teams/Team";
import AddMember from "../views/dashboard/AddMember";
import Clients from "../views/dashboard/clients/Clients";
import AddClient from "../views/dashboard/clients/AddClient";
import Client from "../views/dashboard/clients/Client";
import EditClient from "../views/dashboard/clients/EditClient";
import AddNote from "../views/dashboard/notes/AddNote";
import EditNote from "../views/dashboard/notes/EditNote";
import EditMember from "../views/dashboard/EditMember";
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
        path: '/dashboard/edit-member/:id',
        name: 'EditMember',
        component: EditMember,
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
        path: '/dashboard/clients/:id/add-note',
        name: 'AddNote',
        component: AddNote,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/dashboard/clients/:id/edit-note/:note_id',
        name: 'EditNote',
        component: EditNote,
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
