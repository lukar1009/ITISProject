import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: User = new User();
  public userLoggedIn: boolean = false;
  public userAdmin: boolean = false;

  constructor(private _router: Router) {
    _router.events.subscribe(val => {
      if(localStorage.getItem("id")) {
        this.userLoggedIn = true;
        this.user.id = +localStorage.getItem("id");
        this.user.name = localStorage.getItem("name");
        this.user.email = localStorage.getItem("email");
        this.user.password = localStorage.getItem("password");
        if(localStorage.getItem("admin") == "1") {
          this.userAdmin = true;
          this.user.admin = true;
        }else{
          this.userAdmin = false;
          this.user.admin = false;
        }
      } else {
        this.userLoggedIn = false;
      }
    });
  }

  ngOnInit(): void {
  }

  logoutUser() {
    localStorage.clear();
    this.userLoggedIn = false;
    this.userAdmin = false;
    this._router.navigate(["/home"]);
  }
}
