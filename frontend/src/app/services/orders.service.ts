import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralResponseModel } from '../models/http-models/GeneralResponseModel';
import { OrderParams } from '../models/http-models/OrderParams';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getAllProducts(): GeneralResponseModel {
    let url = "http://localhost:3000/api/orders";
    let request = this.http.get(url);
    let response = new GeneralResponseModel();
    request.subscribe(res => {
      response.data = res["data"];
      response.message = res["message"];
      response.success = res["success"];
    });
    return response;
  }

  getProductByID(orderId: number): GeneralResponseModel {
    let url = "http://localhost:3000/api/orders/" + orderId;
    let request = this.http.get(url);
    let response = new GeneralResponseModel();
    request.subscribe(res => {
      response.data = res["data"];
      response.message = res["message"];
      response.success = res["success"];
    });
    return response;
  }

  insertNewProduct(body: OrderParams): GeneralResponseModel {
    let url = "http://localhost:3000/api/orders/new";
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
