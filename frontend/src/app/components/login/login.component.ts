import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { AuthenticationParams } from 'src/app/models/http-models/AuthenticationParams';
import { GeneralResponseModel } from 'src/app/models/http-models/GeneralResponseModel';
import { UserParams } from 'src/app/models/http-models/UserParams';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = new User();

  public loginEmailValue: string = "";
  public loginPasswordValue: string = "";

  public registerNameValue: string = "";
  public registerEmailValue: string = "";
  public registerPasswordValue: string = "";
  public registerConfirmPasswordValue: string = "";

  constructor(private _usersService: UsersService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  loginUser(loginAfterRegister: boolean = false) {
    if(!loginAfterRegister) {
      this.user = new User();
      let authParams: AuthenticationParams = new AuthenticationParams();
      authParams.email = this.loginEmailValue;
      authParams.password = this.loginPasswordValue;
      this._usersService.loginUser(authParams).then(res => {
        if(res.data != null) {
          this.populateUserFromResponse(res.data);
          this.storeUserData();
          notify({
            message: "You have successfully logged in!",
            width: 300,
            position: 'top center'
          }, "success", 2000);
          this._router.navigate(["/home"]);
        } else {
          this.loginEmailValue = "";
          this.loginPasswordValue = "";
          notify({
            message: "Wrong email or password!",
            width: 300,
            position: 'top center'
          }, "error", 2000);
        }
      });
    }else{
      this.storeUserData();
    }
  }

  storeUserData() {
    localStorage.setItem('id', this.user.id.toString());
    localStorage.setItem('name', this.user.name);
    localStorage.setItem('email', this.user.email);
    localStorage.setItem('password', this.user.password);
    localStorage.setItem('admin', this.user.admin ? "1" : "0");
  }

  registerUser() {
    if(this.validatePasswordMatch()) {

      let userParams: UserParams = new UserParams();
      userParams.name = this.registerNameValue;
      userParams.email = this.registerEmailValue;
      userParams.password = this.registerPasswordValue;
      userParams.admin = false;
  
      this._usersService.insertNewUser(userParams).then(res => {
        if(res.data != null) {
          this.populateUserFromResponse(res.data);
        } else {
          this.user = new User();
          this.registerNameValue = "";
          this.registerEmailValue = "";
          this.registerPasswordValue = "";
          this.registerConfirmPasswordValue = "";
          notify({
            message: res.message,
            width: 300,
            position: 'top center'
          }, "error", 2000);
          return;        
        }
        
        this.loginUser(true);
  
        notify({
          message: "You have successfully created your account!",
          width: 300,
          position: 'top center'
        }, "success", 2000);

        this._router.navigate(['/home']);
      });
      
    } else {
      notify({
        message: "Passwords do not match! Try again...",
        width: 300,
        position: 'top center'
      }, "error", 2000);
      this.registerPasswordValue = "";
      this.registerConfirmPasswordValue = "";
    }
  }

  populateUserFromResponse(data: any) {
    this.user.id = data["id"];
    this.user.name = data["name"];
    this.user.email = data["email"];
    this.user.password = data["password"];
    this.user.admin = data["admin"];
  }

  validatePasswordMatch(): boolean {
    return this.registerPasswordValue == this.registerConfirmPasswordValue;
  }
}
