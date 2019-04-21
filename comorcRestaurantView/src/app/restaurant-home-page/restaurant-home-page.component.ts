import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-home-page',
  templateUrl: './restaurant-home-page.component.html',
  styleUrls: ['./restaurant-home-page.component.css']
})
export class RestaurantHomePageComponent implements OnInit {
  leftSideItemList=[];
  existingItems=[];
  rightSideItemList=new ItemList;
  submitted=false;
  total=0.00;
  address="";
  accountName="";
  constructor(private http:HttpClient, private router:Router) { 
    this.address = window.localStorage.getItem("address");
    this.accountName = window.localStorage.getItem("accountName");
    //make get call
    http.get('http://comorcbackend.us-west-2.elasticbeanstalk.com/item/all')
    .subscribe(response => {

      let dataResponse=null;

      dataResponse=response;
      response=null;

      for(let i=0;i<dataResponse.length;i+=3){
        let tempInnerArray=[];
        for(let j=i;j<3+i;j++){
          if(dataResponse[j]!=undefined){
            tempInnerArray.push(new Item(dataResponse[j].itemName,dataResponse[j].price,dataResponse[j].unit,""));
          }
        }
        this.leftSideItemList.push(tempInnerArray);
      }
    })
  }

  ngOnInit() {
  }

  addItem(item){
    this.rightSideItemList.addItem(item);
    this.total=this.rightSideItemList.getTotalPrice();
  }

  minusItem(item){
    this.rightSideItemList.minusItem(item);
    this.total=this.rightSideItemList.getTotalPrice();
  }

  clearList(){
    this.submitted=false;
    this.rightSideItemList.clearList();
    this.total=this.rightSideItemList.getTotalPrice();
  }

  submitList(){
    let data = this.rightSideItemList.getList();

    let dataArray=[];
    let address = window.localStorage.getItem("address");
    let accountName = window.localStorage.getItem("accountName");

    dataArray.push({
      "accountName":accountName,
      "accountAddress":address,
      "cost":this.rightSideItemList.getTotalPrice()
    })

    for(let i=0;i<data.length;i++){
      dataArray.push({
        "itemName":data[i].name,
        "itemNumber":data[i].numberOfItems,
        "itemCost":data[i].pricePerUnit,
        "itemUnit":data[i].unit
      })
    }
    let jsonOrder=JSON.stringify(dataArray);

    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    this.http.post('http://comorcbackend.us-west-2.elasticbeanstalk.com/order/create',jsonOrder,{headers: headersVar,responseType:"text"})
      .subscribe((val) => {
        /*if(val!=null){
          this.back();
        }*/
        this.clearList();
      });
    

    this.submitted=true;

    //setTimeout(this.clearList(), 5000);
  }

  routeRecords(){
    this.router.navigate(['/web/recordTable/']);
  }

}

class Item{
  name:string;
  pricePerUnit:number;
  unit:string;
  description:string;
  numberOfItems=0;
  priceForGroup=0;

  constructor(name,pricePerUnit,unit,description){
    this.name=name;
    this.pricePerUnit=parseFloat(pricePerUnit);
    this.unit=unit;
    this.description=description;
  }
}

class ItemList{
  private itemList= new Array<Item>(0);
  private totalPrice:number=0.00;

  addItem(item:Item){
    let flag=false;
    for(let i=0;i<this.itemList.length;i++){
      if(this.itemList[i].name===item.name){
        flag=true;
        this.itemList[i].numberOfItems++;
      }
    }
    if(flag===false){
      item.numberOfItems++;
      this.itemList.push(item);
    }
    this.calculateTotal();
  }

  minusItem(item:Item){
    for(let i=0;i<this.itemList.length;i++){
      if(this.itemList[i].name===item.name){
        this.itemList[i].numberOfItems--;
        if(this.itemList[i].numberOfItems===0){
          this.itemList.splice(i,1);
        }
      }
    }
    this.calculateTotal();
  }

  calculateTotal(){
    this.totalPrice=0;
    for(let i=0;i<this.itemList.length;i++){
      this.totalPrice= this.totalPrice + (this.itemList[i].pricePerUnit*this.itemList[i].numberOfItems);
      this.itemList[i].priceForGroup=this.itemList[i].pricePerUnit* this.itemList[i].numberOfItems;
    }
  }

  clearList(){
    for(let i=0; i<this.itemList.length;i++){
      this.itemList[i].numberOfItems=0;
      this.itemList[i].priceForGroup=0;
    }
    this.itemList.splice(0);
    this.calculateTotal();
  }

  getList(){
    return this.itemList;
  }

  getTotalPrice(){
    return this.totalPrice;
  }
}