import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentParams } from '../models/http-models/CommentParams';
import { GeneralResponseModel } from '../models/http-models/GeneralResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  getAllComments(): GeneralResponseModel {
    let url = "http://localhost:3000/api/comments";
    let request = this.http.get(url);
    let response = new GeneralResponseModel();
    request.subscribe(res => {
      response.data = res["data"];
      response.message = res["message"];
      response.success = res["success"];
    });
    return response;
  }

  insertNewComment(body: CommentParams): GeneralResponseModel {
    let url = "http://localhost:3000/api/comments/new";
    let request = this.http.post(url, body);
    let response = new GeneralResponseModel();
    request.subscribe(res => {
      response.data = null;
      response.message = res["message"];
      response.success = res["success"];
    });
    return response;
  }

  removeExistingComment(body: CommentParams): GeneralResponseModel {
    let url = "http://localhost:3000/api/comments/remove";
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
