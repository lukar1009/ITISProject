import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralResponseModel } from '../models/http-models/GeneralResponseModel';
import { ProductParams } from '../models/http-models/ProductParams';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): GeneralResponseModel {
    let url = "http://localhost:3000/api/products";
    let request = this.http.get(url);
    let response = new GeneralResponseModel();
    request.subscribe(res => {
      response.data = res["data"];
      response.message = res["message"];
      response.success = res["success"];
    });
    return response;
  }

  getProductByID(productId: number): GeneralResponseModel {
    let url = "http://localhost:3000/api/products/" + productId;
    let request = this.http.get(url);
    let response = new GeneralResponseModel();
    request.subscribe(res => {
      response.data = res["data"];
      response.message = res["message"];
      response.success = res["success"];
    });
    return response;
  }

  insertNewProduct(body: ProductParams): GeneralResponseModel {
    let url = "http://localhost:3000/api/products/new";
    let request = this.http.post(url, body);
    let response = new GeneralResponseModel();
    request.subscribe(res => {
      response.data = null;
      response.message = res["message"];
      response.success = res["success"];
    });
    return response;
  }

  updateExistingProduct(body: ProductParams): GeneralResponseModel {
    let url = "http://localhost:3000/api/products/update";
    let request = this.http.put(url, body);
    let response = new GeneralResponseModel();
    request.subscribe(res => {
      response.data = null;
      response.message = res["message"];
      response.success = res["success"];
    });
    return response;
  }

  removeExistingProduct(body: ProductParams): GeneralResponseModel {
    let url = "http://localhost:3000/api/products/remove";
    let request = this.http.post(url, body);
    let response = new GeneralResponseModel();
    request.subscribe(res => {
      response.data = null;
      response.message = res["message"];
      response.success = res["success"];
    });
    return response;
  }
}
