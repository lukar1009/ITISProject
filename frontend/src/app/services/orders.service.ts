import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralResponseModel } from '../models/http-models/GeneralResponseModel';
import { OrderParams } from '../models/http-models/OrderParams';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  async getAllOrders(): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/orders";
    return await this.http.get<GeneralResponseModel>(url).toPromise();
  }

  async getOrderByID(orderId: number): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/orders/" + orderId;
    return await this.http.get<GeneralResponseModel>(url).toPromise();
  }

  async insertNewOrder(body: OrderParams): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/orders/new";
    return await this.http.post<GeneralResponseModel>(url, body).toPromise();
  }
}
