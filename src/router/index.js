import { createRouter, createWebHashHistory } from "vue-router";
import Home from '../components/MyHome.vue'
import Login from '../components/MyLogin.vue'
import User from '../components/menus/MyUsers.vue'
import Power from '../components/menus/MyRights.vue'
import Goods from '../components/menus/MyGoods.vue'
import Orders from '../components/menus/MyOrders.vue'
import Setting from '../components/menus/MySettings.vue'
import UserDetail from '../components/user/MyUserDetail.vue'

const routes = [{
        path: '/',
        redirect: '/login'
    }, {
        path: '/home',
        component: Home,
        children: [
            { path: 'user', component: User },
            { path: 'power', component: Power },
            { path: 'goods', component: Goods },
            { path: 'orders', component: Orders },
            { path: 'setting', component: Setting },
            { path: 'user/:id', component: UserDetail, props: true }
        ]
    },
    {
        path: '/login',
        component: Login
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path === "/login") return next()
    const token = localStorage.getItem('token')
    if (to.path === '/home' && !token) {
        next('/login')
    } else {
        next()
    }

})
export default router