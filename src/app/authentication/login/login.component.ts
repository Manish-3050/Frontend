import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../authService/auth-service.service';
import * as Notiflix from 'notiflix';
import { UserService } from 'src/app/services/user.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { SocketService } from 'src/app/socket/socket.service';
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
    private contactsService:ContactsService,
    private SocketService:SocketService
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
      this.SocketService.initSocket(userdata)
    },(err:any)=>{
      Notiflix.Notify.failure(err.error.message);
      console.log("Error while login",err)
    })
   
  }
  // joingroup(){
  //   this.SocketService.joinGroup()
  // }

  // sendmsg(){
  //   this.SocketService.sendNewMessageInGroup('sending msg in Group')
  // }


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
