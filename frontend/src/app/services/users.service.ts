import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationParams } from '../models/http-models/AuthenticationParams';
import { GeneralResponseModel } from '../models/http-models/GeneralResponseModel';
import { UserParams } from '../models/http-models/UserParams';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    let url = "http://localhost:3000/api/users";
    let request = this.http.get(url);
    let response = new GeneralResponseModel();
    request.subscribe(res => {
      response.data = res["data"];
      response.message = res["message"];
      response.success = res["success"];
    });
    return response;
  }

  getUserByID(userId: number): GeneralResponseModel {
    let url = "http://localhost:3000/api/users/" + userId;
    let request = this.http.get(url);
    let response = new GeneralResponseModel();
    request.subscribe(res => {
      response.data = res["user"];
      response.message = res["message"];
      response.success = res["success"];
    });
    return response;
  }

  loginUser(body: AuthenticationParams): GeneralResponseModel {
    let url = "http://localhost:3000/api/users/authenticate";
    let request = this.http.post(url, body);
    let response = new GeneralResponseModel();
    request.subscribe(res => {
      response.data = res["user"];
      response.message = res["message"];
      response.success = res["success"];
    });
    return response;
  }

  insertNewUser(body: UserParams): GeneralResponseModel {
    let url = "http://localhost:3000/api/users/new";
    let request = this.http.post(url, body);
    let response = new GeneralResponseModel();
    request.subscribe(res => {
      response.data = null;
      response.message = res["message"];
      response.success = res["success"];
    });
    return response;
  }

  updateExistingUser(body: UserParams): GeneralResponseModel {
    let url = "http://localhost:3000/api/users/update";
    let request = this.http.put(url, body);
    let response = new GeneralResponseModel();
    request.subscribe(res => {
      response.data = null;
      response.message = res["message"];
      response.success = res["success"];
    });
    return response;
  }

  removeExistingUser(body: UserParams): GeneralResponseModel {
    let url = "http://localhost:3000/api/users/remove";
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
