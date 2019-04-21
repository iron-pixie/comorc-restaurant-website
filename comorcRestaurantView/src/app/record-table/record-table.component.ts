import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css']
})
export class RecordTableComponent implements OnInit {
  orderSource
  keys=["Invoice Id","Cost","Creation Time"];
  keysPlus=["Invoice Id","Cost","Creation Time","View"]
  getDone=false;
  constructor(private location:Location, private http:Http,private router:Router, private httpC:HttpClient){ 

    let orderArray=[];

    http.get('http://comorcbackend.us-west-2.elasticbeanstalk.com/order/all')
      .subscribe(response => {

        let dataResponse=null;

        dataResponse=response.json()
        response=null;

        for(let data of dataResponse){
          orderArray.push(
            new Order(
              data[0].cost,
              data[0].creationTime,
              data[0].accountName,
              data[0].accountAddress,
              data[0].invoiceId
            )
          )
        }
        this.orderSource = new MatTableDataSource(orderArray);
        this.orderSource.filterPredicate  =function(data,accountName){
          return data.accountName === accountName;
        }
        let accountName=window.localStorage.getItem("accountName");
        this.orderSource.filter=accountName;
        this.getDone=true;
        console.log(this.orderSource);
      })

  }

  ngOnInit() {
  }

  back(){
    this.location.back();
  }

  viewRow(item){
    window.localStorage.setItem("id",item.invoiceId);    
    this.router.navigate(['/web/record/'+item.invoiceId]);
  }

  
}

class Order{
  cost:string;
  creationTime:string;
  accountName:string;
  accountAddress:string;
  invoiceId:string;

  constructor(cost,creationTime,accountName,accountAddress,invoiceId){
    this.cost=cost;
    this.creationTime=creationTime;
    this.accountName=accountName;
    this.accountAddress=accountAddress;
    this.invoiceId=invoiceId;
  }
}