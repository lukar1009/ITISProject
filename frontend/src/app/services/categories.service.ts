import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralResponseModel } from '../models/http-models/GeneralResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  async getAllCategories(): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/categories";
    return await this.http.get<GeneralResponseModel>(url).toPromise();
  }
}
