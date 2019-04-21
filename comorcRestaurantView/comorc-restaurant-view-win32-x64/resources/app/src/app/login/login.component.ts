import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFinished = false;
  loginError = false;
  userLoggedIn="";

  loginForm: FormGroup;

  constructor(private http:HttpClient, private router:Router) {
    this.loginForm = new FormGroup({
      userName:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required])
    });
  }

  ngOnInit() {
  }

  onType(){
    this.loginError = false;
  }

  tryLogin(input :HTMLInputElement){
    let login={
      "username":input["userName"],
      "password":input["password"]
    };

    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    let options = {
      headers: headersVar
    }

    this.router.navigate(['/web/home/']);
    window.localStorage.setItem("username","user1");

    /*this.http.post('https://d1jq46p2xy7y8u.cloudfront.net/login',login,options)
      .subscribe((res) => {
        let resString=res['Auth'];
        if(resString.includes("ERROR")){
          this.loginError=true;
        }
        else if(res["userLevel"]==="security"){
          this.loginError=false;
          this.loginFinished=true;
          this.userLoggedIn=input["userName"];
          window.localStorage.setItem("username",input["userName"]);
          this.router.navigate(['/web/home/']);
        }
      });*/
  }

  /*goToRegister(){
    this.router.navigate(['/web/home']);
  }*/

}
