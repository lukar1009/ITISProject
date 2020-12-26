import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralResponseModel } from '../models/http-models/GeneralResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getAllCategories(): GeneralResponseModel {
    let url = "http://localhost:3000/api/categories";
    let request = this.http.get(url);
    let response = new GeneralResponseModel();
    request.subscribe(res => {
      response.data = res["data"];
      response.message = res["message"];
      response.success = res["success"];
    });
    return response;
  }
}
