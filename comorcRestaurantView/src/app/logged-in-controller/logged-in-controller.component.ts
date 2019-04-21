import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-in-controller',
  templateUrl: './logged-in-controller.component.html',
  styleUrls: ['./logged-in-controller.component.css']
})
export class LoggedInControllerComponent implements OnInit {

  constructor(private router:Router) { 
    let user = window.localStorage.getItem("username");
    if(user=""){
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
  }

}
