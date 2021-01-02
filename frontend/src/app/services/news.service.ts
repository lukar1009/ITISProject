import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralResponseModel } from '../models/http-models/GeneralResponseModel';
import { NewsParams } from '../models/http-models/NewsParams';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  async getAllNews(): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/news";
    return await this.http.get<GeneralResponseModel>(url).toPromise();
  }

  async getNewsByID(newsId: number): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/news/" + newsId;
    return await this.http.get<GeneralResponseModel>(url).toPromise();
  }

  async insertNewNews(body: NewsParams): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/news/new";
    return await this.http.post<GeneralResponseModel>(url, body).toPromise();
  }

  async updateExistingNews(body: NewsParams): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/news/update";
    return await this.http.put<GeneralResponseModel>(url, body).toPromise();
  }

  async removeExistingNews(body: NewsParams): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/news/remove";
    return await this.http.post<GeneralResponseModel>(url, body).toPromise();
  }
}
