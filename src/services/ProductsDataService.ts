import http from "@/http-common";

/* eslint-disable */
class ProductsDataService {
  getAll(limit: number|null, skip: number|null): Promise<any> {
    return http.get('/products' + (limit ? `?limit=${limit}` : '') + (skip ? `&skip=${skip}` : ''));
  }

  get(id: any): Promise<any> {
    return http.get(`/products/${id}`);
  }

  create(data: any): Promise<any> {
    return http.post('/products/add', data);
  }

  update(id: any, data: any): Promise<any> {
    delete data.id;

    return http.put(`/products/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/products/${id}`);
  }

  deleteAll(): Promise<any> {
    return http.delete(`/products`);
  }

  search(title: string): Promise<any> {
    return http.get(`/products/search?q=${title}`);
  }
}

export default new ProductsDataService();
