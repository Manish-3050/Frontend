import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../authService/auth-service.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public validform=true
  public validPassword=true
  public usernamemm: any;
  public passwordmm: any;
  public remember_me=false

  ngOnInit() {
    const crendentials:any= localStorage.getItem("remember_meCredentials")
    const data=JSON.parse(crendentials)
    if(data.remember_me){
      this.usernamemm=data.username
      this.passwordmm=data.password
      this.remember_me=data.remember_me
    }
    console.log("local storage ",data)
   }  
   constructor(private router: Router,private authService:AuthServiceService) {
    // this.authService.getUser().subscribe(res=>{
    //   console.log("data coming",res)
    // })
   }

  onSubmit(data:NgForm){
    console.log("data",data)
    this.validform=data.form.touched 
   if(data.valid){
    if(data.value.remember_me){
      const storeCrendials={
        username:data.value.username123,
        password:data.value.password123,
        remember_me:data.value.remember_me
      }
      localStorage.setItem("remember_meCredentials",JSON.stringify(storeCrendials))
    }else{
      const storeCrendials={
        remember_me:data.value.remember_me
      }
      localStorage.removeItem("remember_meCredentials")
      localStorage.setItem("remember_meCredentials",JSON.stringify(storeCrendials))
    }
    // console.log("Login Form Testing successfully passed")
    this.authService.getUser(data.value).subscribe(res=>{
      console.log("user credentials",res)
       let response=JSON.parse(JSON.stringify(res)); 
      if(response.status){
        // let data=JSON.parse(res.toString()); 
        // console.log("data stringify",data[0].name,data[0].rollno)
         this.router.navigate(['/home'])
         Notiflix.Notify.success('Welcome To PizzaBazzar');
      }else{
        Notiflix.Notify.failure(response.msg);
        console.log("no response from backend",response.msg)
      }
    })

    //logic of backend 
   

    ///
   }else{
    if(data.form.value.username123==undefined || data.form.value.username123==''){
      this.validform=false
    }
    if(data.form.value.password123==undefined||data.form.value.password123==''){
       this.validPassword=false
    }else{
      this.validPassword=true
    }
   }
   
  }



  usernameValidate(username:any, type:any){
    if(type=='username'){
      if(username==' ' || username==''){
      this.validform=false
    }else
    this.validform=true
    }
    if(type=='password'){
      if(username==' '||username==''){
        this.validPassword=false
      }else{
        this.validPassword=true
      }
    }
  }
  
}
