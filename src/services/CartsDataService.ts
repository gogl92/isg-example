import http from "@/http-common";

/* eslint-disable */
class CartsDatService {
  getAll(): Promise<any> {
    return http.get('/carts');
  }

  get(id: any): Promise<any> {
    return http.get(`/carts/${id}`);
  }

  create(data: any): Promise<any> {
    return http.post('/carts/add', data);
  }

  update(id: any, data: any): Promise<any> {
    delete data.id;

    return http.put(`/carts/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/carts/${id}`);
  }

  deleteAll(): Promise<any> {
    return http.delete(`/carts`);
  }

  search(title: string): Promise<any> {
    return http.get(`/carts/search?q=${title}`);
  }
}

export default new CartsDatService();
