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
      "userName":input["userName"],
      "password":input["password"]
    };

    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    let options = {
      headers: headersVar
    }

    this.http.post('http://comorcbackend.us-west-2.elasticbeanstalk.com/account/login',login,options)
      .subscribe((res) => {
        console.log(res);
        let resString=res['Auth'];
        if(resString.includes("ERROR")){
          this.loginError=true;
        }
        else{
          this.loginError=false;
          this.loginFinished=true;
          window.localStorage.setItem("address",res["address"]);
          window.localStorage.setItem("accountName",res["accountName"]);
          this.router.navigate(['/web/home/']);
        }
      });
  }
  /*goToRegister(){
    this.router.navigate(['/web/home']);
  }*/
}
