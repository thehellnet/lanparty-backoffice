import httpClient from "./http.service";

export default class BaseService {
  entity: string;

  constructor(entity: string) {
    if (entity) {
      throw new Error("Child service class not provide entity");
    }
    this.entity = entity;
  }

  getAll() {
    return httpClient.get(`/rest/${this.entity}s`);
  }

  get(id: string | number) {
    return httpClient.get(`/rest/${this.entity}s/${id}`);
  }

  create(data: any) {
    return httpClient.post(`/rest/${this.entity}s`, data);
  }

  update(id: string | number, data: any) {
    return httpClient.put(`/rest/${this.entity}s/${id}`, data);
  }

  delete(id: string | number) {
    return httpClient.delete(`/rest/${this.entity}s/${id}`);
  }

  profile() {
    return httpClient.get(`/rest/profile/${this.entity}s`);
  }
}
