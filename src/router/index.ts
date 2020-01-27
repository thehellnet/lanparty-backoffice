import { Vue } from 'vue-property-decorator'
import VueRouter from 'vue-router'
import Home from '@/router/views/Home.vue'
import tokenService from '@/services/auth/token.service'
import logger from '@/services/app-logger/app-logger.service'
import httpClient from '@/services/http/http.service'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        beforeEnter: async (to, from, next) => {
            if (!tokenService.getToken()) {
                logger.debug('no token in local storage')
                next({ path: '/login' })
            } else {
                try {
                    const response = await httpClient.get('/v1/auth/isTokenValid')
                    logger.info('token is valid', response)
                    store.commit('AuthModule/setAuthenticated', true)
                    next()
                } catch (e) {
                    logger.info('token expired', e)
                    next({ path: '/login' })
                }
            }
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./views/Login.vue'),
    },
    {
        path: '/confirm/:token?',
        name: 'confirm',
        props: true,
        component: () => import('./views/Confirm.vue'),
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('./views/About.vue'),
    },
    {
        path: '/entity/:entity',
        name: 'entity',
        props: true,
        component: () => import('./views/Entity.vue'),
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

// router.beforeEach((to, from, next) => {
//     if (!isAuthenticated) next('/login')
//     else next()
// })

export default router
