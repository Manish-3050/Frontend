import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../authService/auth-service.service';
import * as Notiflix from 'notiflix';
import { UserService } from 'src/app/services/user.service';
import { ContactsService } from 'src/app/services/contacts.service';
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
usernameValue: any;
passwordValue: any;
  @ViewChild('f')
  loginForm!: NgForm;  
   constructor(
    private router: Router,
    private authService:AuthServiceService,
    private userService:UserService,
    private contactsService:ContactsService
  ) {
    // this.authService.getUser().subscribe(res=>{
    //   console.log("data coming",res)
    // })

   }
   ngOnInit() {
   }

  onSubmit(data:NgForm){
    console.log("data",data)
    console.log("login form",this.loginForm.value)
    // if(data)
    // this.userService.userData$.next(userdata)
    this.userService.login(this.loginForm.value).subscribe((res:any)=>{
      console.log("login page hhtp req subscribe",res)
      Notiflix.Notify.success('login Successfully');
      let userdata={
        id:res.data.userDetails._id,
        firstName:res.data.userDetails.firstName,
        lastName:res.data.userDetails.lastName,
        avtar:res.data.userDetails.avtar
      }
       this.userService.userData$.next(userdata)
       localStorage.removeItem("userData")
       localStorage.setItem("userData",JSON.stringify(userdata))
    },(err:any)=>{
      Notiflix.Notify.failure(err.error.message);
      console.log("Error while login",err)
    })




  //   this.validform=data.form.touched 
  //  if(data.valid){
  //   if(data.value.remember_me){
  //     const storeCrendials={
  //       username:data.value.username123,
  //       password:data.value.password123,
  //       remember_me:data.value.remember_me
  //     }
  //     localStorage.setItem("remember_meCredentials",JSON.stringify(storeCrendials))
  //   }else{
  //     const storeCrendials={
  //       remember_me:data.value.remember_me
  //     }
  //     localStorage.removeItem("remember_meCredentials")
  //     localStorage.setItem("remember_meCredentials",JSON.stringify(storeCrendials))
  //   }
  //   // console.log("Login Form Testing successfully passed")
  //   // this.authService.getUser(data.value).subscribe(res=>{
  //   //   console.log("user credentials",res)
  //   //    let response=JSON.parse(JSON.stringify(res)); 
  //   //   if(response.status){
  //   //     // let data=JSON.parse(res.toString()); 
  //   //     // console.log("data stringify",data[0].name,data[0].rollno)
  //   //      this.router.navigate(['/home'])
  //   //      Notiflix.Notify.success('Welcome To PizzaBazzar');
  //   //   }else{
  //   //     Notiflix.Notify.failure(response.msg);
  //   //     console.log("no response from backend",response.msg)
  //   //   }
  //   // })

  //   //logic of backend 
   

  //   ///
  //  }else{
  //   if(data.form.value.username123==undefined || data.form.value.username123==''){
  //     this.validform=false
  //   }
  //   if(data.form.value.password123==undefined||data.form.value.password123==''){
  //      this.validPassword=false
  //   }else{
  //     this.validPassword=true
  //   }
  //  }
   
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
