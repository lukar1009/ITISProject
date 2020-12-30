import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userLoggedIn: boolean = false;
  public userAdmin: boolean = false;

  constructor(private _router: Router) {
    _router.events.subscribe(val => {
      if(localStorage.getItem("id")) {
        this.userLoggedIn = true;
        if(localStorage.getItem("admin") == "1") {
          this.userAdmin = true;
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
