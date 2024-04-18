import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent {
  constructor( public product: ProductsService){}
 availablepizza:any=[
  'EVERYDAY VALUE',
  'BESTSELLER',
  'NEW LAUNCHES',
  'VEG PIZZA',
  'NON-VEG PIZZA',
  'BEVERAGES',
  'SPECIAL PIZZA',
  'PIZZA MANIA',
  'MEALS & COMBOS',
  'DESERTS',
  'MANISH  '
 ];
 buttonvalue=''
 fun(){
  this.buttonvalue='manish';
  //console.log("navbar button");
  //this.pizzasComponent.experiment();
  //this.product.eventexperiment.emit("event emitter")
 }
}

