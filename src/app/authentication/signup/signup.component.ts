import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { LoginComponent } from '../login/login.component';
import { FooterComponent } from 'src/app/authentication/footer/footer.component';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private builder:FormBuilder, private router:Router,private product:ProductsService){}
  select=0;
  dropdown=false
  postmethod(){
    let data={
      rollno:132,
      name:"sharad kumar",
      class:"tenth"
}
   this.product.poststudent(data).subscribe(data=>{
    console.log("button clicked",data)
   })
  }
  names=[{
    name:'manish',
    age:18,
    id:11
  },
  {
    name:'sharad',
    age:28,
    id:12
  },
  {
    name:'ajay',
    age:38,
    id:13
  }
]    
  showDropdown: boolean = false;
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  selectOption(option:any) {
    console.log("option valus",option)
    this.showDropdown = false; // Hide the dropdown after selecting an option
  }
}
