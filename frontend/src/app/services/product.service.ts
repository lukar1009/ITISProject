import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralResponseModel } from '../models/http-models/GeneralResponseModel';
import { ProductParams } from '../models/http-models/ProductParams';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  async getAllProducts(): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/products";
    return await this.http.get<GeneralResponseModel>(url).toPromise();
  }

  async getProductByID(productId: number): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/products/" + productId;
    return await this.http.get<GeneralResponseModel>(url).toPromise();
  }

  async insertNewProduct(body: ProductParams): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/products/new";
    return await this.http.post<GeneralResponseModel>(url, body).toPromise();
  }

  async updateExistingProduct(body: ProductParams): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/products/update";
    return await this.http.put<GeneralResponseModel>(url, body).toPromise();
  }

  async removeExistingProduct(body: ProductParams): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/products/remove";
    return await this.http.post<GeneralResponseModel>(url, body).toPromise();
  }
}
