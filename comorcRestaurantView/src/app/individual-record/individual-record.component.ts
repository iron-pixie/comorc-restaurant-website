import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-individual-record',
  templateUrl: './individual-record.component.html',
  styleUrls: ['./individual-record.component.css']
})
export class IndividualRecordComponent implements OnInit {

  itemSource;
  keys=["Item Name","Unit Cost","Number","Volume Cost"];
  getDone=false;
  invoiceId="";
  accountName="";
  accountAddress="";
  creationTime="";
  totalCost=0.0;
  constructor(private location:Location, private http:Http,private router:Router, private httpC:HttpClient) { 
    let itemArray=[];
    
    let invoiceId=window.localStorage.getItem("id");
    http.get('http://comorcbackend.us-west-2.elasticbeanstalk.com/order/all')
      .subscribe(response => {
        let dataResponse=null;

        dataResponse=response.json()
        response=null;
        let innerArray;

        for(let data of dataResponse){
          if(data[0]["invoiceId"] == invoiceId){
            innerArray=data;
          }
        }
        this.accountName=innerArray[0].accountName;
        this.invoiceId=innerArray[0].invoiceId;
        this.accountAddress=innerArray[0].accountAddress;
        this.creationTime=innerArray[0].creationTime;
        this.totalCost=parseFloat(innerArray[0].cost);

        console.log(this.totalCost)

        for(let dat of innerArray.splice(1,innerArray.length)){
          itemArray.push(new Item(dat.itemName,dat.itemCost,dat.itemUnit,dat.itemNumber))
        }

        this.itemSource = new MatTableDataSource(itemArray);
        this.getDone=true;
      })
  }

  ngOnInit() {
  }

  back(){
    this.location.back();
  }

  printStart(){
    window.print();
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

class Item{
  name:string;
  pricePerUnit:number;
  unit:string;
  description:string;
  numberOfItems=0;
  priceForGroup=0;

  constructor(name,pricePerUnit,unit,numberOfItems){
    this.name=name;
    this.pricePerUnit=parseFloat(pricePerUnit);
    this.unit=unit;
    this.numberOfItems=numberOfItems;
    //this.description=description;
    this.priceForGroup=parseFloat(pricePerUnit)*parseFloat(numberOfItems);
  }
}