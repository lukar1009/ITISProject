import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentParams } from '../models/http-models/CommentParams';
import { GeneralResponseModel } from '../models/http-models/GeneralResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  async getAllComments(): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/comments";
    return await this.http.get<GeneralResponseModel>(url).toPromise();
  }

  async insertNewComment(body: CommentParams): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/comments/new";
    return await this.http.post<GeneralResponseModel>(url, body).toPromise();
  }

  async removeExistingComment(body: CommentParams): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/comments/remove";
    return await this.http.post<GeneralResponseModel>(url, body).toPromise();
  }
}
