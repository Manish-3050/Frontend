import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { userDatatype } from './models/model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Foodordering';
  public user:userDatatype={ id: 0, firstName: '', lastName: '',avtar:'' }
  constructor(private userService:UserService){
    this.userService.userData$.subscribe((res)=>{
      this.user=res
      console.log("app component user data",this.user)
    })
  }
  ngOnInit() {
    const crendentials:any= localStorage.getItem("userData")
    const localStoragedata=JSON.parse(crendentials)
    console.log("user data from local sstorage",localStoragedata)
    this.user=localStoragedata
    if(this.user.id){
      this.userService.userData$.next( this.user)
    }
  }
}
