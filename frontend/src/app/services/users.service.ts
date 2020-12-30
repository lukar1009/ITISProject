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

  async getAllUsers(): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/users";
    return await this.http.get<GeneralResponseModel>(url).toPromise();
  }

  async getUserByID(userId: number): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/users/" + userId;
    return await this.http.get<GeneralResponseModel>(url).toPromise();
  }

  async loginUser(body: AuthenticationParams): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/users/authenticate";
    return await this.http.post<GeneralResponseModel>(url, body).toPromise();
  }

  async insertNewUser(body: UserParams): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/users/new";
    return await this.http.post<GeneralResponseModel>(url, body).toPromise();
  }

  async updateExistingUser(body: UserParams): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/users/update";
    return await this.http.put<GeneralResponseModel>(url, body).toPromise();
  }

  async removeExistingUser(body: UserParams): Promise<GeneralResponseModel> {
    let url = "http://localhost:3000/api/users/remove";
    return await this.http.post<GeneralResponseModel>(url, body).toPromise();
  }
}
