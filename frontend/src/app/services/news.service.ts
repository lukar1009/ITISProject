import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralResponseModel } from '../models/http-models/GeneralResponseModel';
import { NewsParams } from '../models/http-models/NewsParams';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getAllNews(): GeneralResponseModel {
    let url = "http://localhost:3000/api/news";
    let request = this.http.get(url);
    let response = new GeneralResponseModel();
    request.subscribe(res => {
      response.data = res["data"];
      response.message = res["message"];
      response.success = res["success"];
    });
    return response;
  }

  getNewsByID(newsId: number): GeneralResponseModel {
    let url = "http://localhost:3000/api/news/" + newsId;
    let request = this.http.get(url);
    let response = new GeneralResponseModel();
    request.subscribe(res => {
      response.data = res["news"];
      response.message = res["message"];
      response.success = res["success"];
    });
    return response;
  }

  insertNewNews(body: NewsParams): GeneralResponseModel {
    let url = "http://localhost:3000/api/news/new";
    let request = this.http.post(url, body);
    let response = new GeneralResponseModel();
    request.subscribe(res => {
      response.data = null;
      response.message = res["message"];
      response.success = res["success"];
    });
    return response;
  }

  updateExistingNews(body: NewsParams): GeneralResponseModel {
    let url = "http://localhost:3000/api/news/update";
    let request = this.http.put(url, body);
    let response = new GeneralResponseModel();
    request.subscribe(res => {
      response.data = null;
      response.message = res["message"];
      response.success = res["success"];
    });
    return response;
  }

  removeExistingNews(body: NewsParams): GeneralResponseModel {
    let url = "http://localhost:3000/api/news/remove";
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
