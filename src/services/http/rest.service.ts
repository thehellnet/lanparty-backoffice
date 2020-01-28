import httpClient from './http.service'

class RestService {
    constructor() {}

    getAll(entity: string, queryParams?: { page: string; size: string; sort: string }) {
        return httpClient.get(`/rest/${entity}${composeQueryParams(queryParams)}`).then(response => {
            return {
                [`${entity}`]: response.data._embedded[`${entity}`],
                page: response.data.page,
            }
        })
    }

    get(entity: string, id: string | number) {
        return httpClient.get(`/rest/${entity}/${id}`)
    }

    getEntities() {
        return httpClient.get(`/rest`).then(response => Object.keys(response.data._links || {}))
    }

    create(entity: string, data: any) {
        return httpClient.post(`/rest/${entity}`, data)
    }

    update(entity: string, id: string | number, data: any) {
        return httpClient.put(`/rest/${entity}/${id}`, data)
    }

    delete(entity: string, id: string | number) {
        return httpClient.delete(`/rest/${entity}/${id}`)
    }

    entityProfile(entity: string) {
        return httpClient.get(`/rest/profile/${entity}`, { headers: { 'content-type': 'application/alps+json' } })
    }

    entitySchema(entity: string): Promise<EntitySchemaProp> {
        return httpClient
            .get(`/rest/profile/${entity}`, { headers: { accept: 'application/schema+json' } })
            .then(response => {
                return response.data
            })
    }

    entityConfig(entity: string): Promise<EntitySchema> {
        return httpClient.get(`/v1/config/metadata/${entity}`).then(response => {
            return response.data
        })
    }

    lazyLoad(entity, id, related) {
        return httpClient.get(`/rest/${entity}/${id}/${related}`)
    }

    restProfile() {
        return httpClient.get(`/rest/profile`, { headers: { 'content-type': 'application/alps+json' } })
    }
}

function composeQueryParams(params) {
    return !params || Object.entries(params).length === 0
        ? ``
        : `?${Object.entries(params)
              .map(([key, val]) => `${key}=${val}`)
              .join('&')}`
}
const restService = new RestService()

export default restService

export interface EntitySchemaProp {
    title: string
    readOnly: boolean
    type: string
    format?: string
}

export interface EntitySchema {
    name: string
    title: string
    fields: FieldSchema[]
}

export interface FieldSchema {
    name: string
    title: string
    type: string
    class: string
    nullable: boolean
    unique: boolean
    hidden: boolean
}
