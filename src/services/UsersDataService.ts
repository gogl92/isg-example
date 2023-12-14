import http from "@/http-common";

/* eslint-disable */
class UsersDatService {
  getAll(): Promise<any> {
    return http.get('/users');
  }

  get(id: any): Promise<any> {
    return http.get(`/users/${id}`);
  }

  create(data: any): Promise<any> {
    return http.post('/users/add', data);
  }

  update(id: any, data: any): Promise<any> {
    delete data.id;

    return http.put(`/users/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/users/${id}`);
  }

  deleteAll(): Promise<any> {
    return http.delete(`/users`);
  }

  search(title: string): Promise<any> {
    return http.get(`/users/search?q=${title}`);
  }
}

export default new UsersDatService();
