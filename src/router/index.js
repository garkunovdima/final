import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/profile.vue'
import Reg from '../views/reg.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/reg',
        name: 'Reg',
        component: Reg
    },
    {
        //path: '/profile',
        path: '/profile/:uid',
        name: 'Profile',
        component: Profile
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router