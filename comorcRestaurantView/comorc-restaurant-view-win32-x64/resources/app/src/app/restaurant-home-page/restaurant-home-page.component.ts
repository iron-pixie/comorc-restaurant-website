import { Component, OnInit } from '@angular/core';

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
  constructor() { 
    //make get call
    let one=new Item("Celery",2.50,"lb(s)","des");
    let two=new Item("Tomatoes",4.78,"lb(s)","des2");
    let three=new Item("Cheddar",3.12,"lb(s)","des3");
    let four=new Item("Chicken",8.68,"lb(s)","des4");
    let five=new Item("Pork",10.00,"lb(s)","des5");
    let inputArray=[one,two,three,four,five];
    for(let i=0;i<inputArray.length;i+=3){
      let tempInnerArray=[];
      for(let j=i;j<3+i;j++){
        if(inputArray[j]!=undefined){
          tempInnerArray.push(inputArray[j]);
        }
      }
      this.leftSideItemList.push(tempInnerArray);
    }

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

    //do submit stuff

    this.submitted=true;

    //setTimeout(this.clearList(), 5000);
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
    this.pricePerUnit=pricePerUnit;
    this.unit=unit;
    this.description=this.description;
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