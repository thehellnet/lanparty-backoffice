import httpClient from './http.service'
import logger from '@/services/app-logger/app-logger.service'

class RestService {
    constructor() {}

    getAll(entity: string, page?, size?, sort?) {
        return httpClient.get(`/rest/${entity}s`).then(response => {
            return response.data._embedded[`${entity}s`]
        })
    }

    get(entity: string, id: string | number) {
        return httpClient.get(`/rest/${entity}s/${id}`)
    }

    create(entity: string, data: any) {
        return httpClient.post(`/rest/${entity}s`, data)
    }

    update(entity: string, id: string | number, data: any) {
        return httpClient.put(`/rest/${entity}s/${id}`, data)
    }

    delete(entity: string, id: string | number) {
        return httpClient.delete(`/rest/${entity}s/${id}`)
    }

    entityProfile(entity: string) {
        return httpClient.get(`/rest/profile/${entity}s`, { headers: { 'content-type': 'application/alps+json' } })
    }

    entitySchema(entity: string): Promise<EntitySchema> {
        return httpClient
            .get(`/rest/profile/${entity}s`, { headers: { accept: 'application/schema+json' } })
            .then(response => {
                return response.data
            })
    }

    entityConfig(entity: string): Promise<EntitySchema> {
        return httpClient.get(`/v1/config/metadata/${entity}s`).then(response => {
            return response.data
        })
    }

    lazyLoad(entity, id, related) {
        return httpClient.get(`/rest/${entity}s/${id}/${related}`)
    }

    restProfile() {
        return httpClient.get(`/rest/profile`, { headers: { 'content-type': 'application/alps+json' } })
    }
}
const restService = new RestService()

export default restService

class EntitySchemaProp {
    title: string
    readOnly: boolean
    type: string
    format?: string
}

export class EntitySchema {
    title: string
    properties: { [key: string]: EntitySchemaProp }
    definitions: any
    type: string
}
