import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import store from '../../store'

import tokenService from '../token.service'

const getClient = (baseUrl: string) => {
    const config: AxiosRequestConfig = {
        baseURL: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_API_PREFIX}`,
    }

    const client = axios.create(config)

    const isAuthInterceptorEnabled = (config: AxiosRequestConfig = {}) => {
        return !(config.hasOwnProperty('auth') && !config.auth)
    }

    const defaultHeadersInterceptor = (config: AxiosRequestConfig) => {
        config.headers['content-type'] = 'application/json'
        console.log(config)
        return config
    }

    const authInterceptor = (config: AxiosRequestConfig) => {
        if (isAuthInterceptorEnabled(config)) {
            const token = tokenService.getToken()
            if (token) {
                config.headers['x-auth-token'] = token
            }
        }
        return config
    }

    const handleResponseError = error => {
        store.commit('SpinnerModule/hide')
        return Promise.reject(error)
    }

    const handleResponseSuccess = response => {
        store.commit('SpinnerModule/hide')
        return response
    }

    const showSpinnerInterceptor = data => {
        store.commit('SpinnerModule/show')
        return data
    }

    const hideSpinnerInterceptor = data => {
        store.commit('SpinnerModule/hide')
        return data
    }

    client.interceptors.request.use(showSpinnerInterceptor)
    client.interceptors.request.use(defaultHeadersInterceptor)
    client.interceptors.request.use(authInterceptor)

    client.interceptors.response.use(hideSpinnerInterceptor)
    client.interceptors.response.use(handleResponseSuccess, handleResponseError)

    return client
}

export class HttpClient {
    private client: AxiosInstance

    constructor(baseUrl) {
        this.client = getClient(baseUrl)
    }

    public get(url, conf = {}) {
        return this.client
            .get(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }

    public delete(url, conf = {}) {
        return this.client
            .delete(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }

    public head(url, conf = {}) {
        return this.client
            .head(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }

    public post(url, data = {}, conf = {}): Promise<any> {
        return this.client
            .post(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }

    public put(url, data = {}, conf = {}) {
        return this.client
            .put(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }

    public patch(url, data = {}, conf = {}) {
        return this.client
            .patch(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }
}

const httpClient = new HttpClient(`${process.env.URL_NODE_ETH}`)

export default httpClient
