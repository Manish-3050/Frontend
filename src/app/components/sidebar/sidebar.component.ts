import { Component ,Renderer2,ElementRef,ViewChild} from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { contacts } from 'src/app/models/model';
import { userDatatype } from 'src/app/models/model';
import { UserService } from 'src/app/services/user.service';
import * as Notiflix from 'notiflix';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import {SocketService} from '../../socket/socket.service'
'@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @ViewChild('toggleButton')
  toggleButton!: ElementRef;
  @ViewChild('menu')
  menu!: ElementRef;
  public contacts:any=[]
  public isMenuOpended:boolean=false
  public userData:userDatatype={ id: 0, firstName: '', lastName: '',avtar:'' }
//  datas=[1,2,3,4,5,6,7,8,9]
 constructor(
   public contactService: ContactsService,
   public userService:UserService,
   private socketService:SocketService,
   private renderer: Renderer2
  ){
  this.userService.userData$.subscribe((res:userDatatype)=>{
    this.userData=res
    console.log("sidebar component user data",this.userData)
  })


  //THIS IS TO TOOGLE THE LOGOUT DROPDOWN
  this.renderer.listen('window', 'click',(e:Event)=>{
    if( this.isMenuOpended){
      if(e.target !== this.toggleButton.nativeElement && e.target!==this.menu.nativeElement){
          this.isMenuOpended=false;
      }
    }
});
}

ngOnInit(){
  const crendentials:any= localStorage.getItem("userData")
  const localStoragedata=JSON.parse(crendentials)
  this.contactService.getContacts(localStoragedata.id).subscribe((res:any)=>{
    this.contacts=res.data
  })

}
setCurrentContact(contact:any){
  let image='kkkkk'
  console.log("contact setting",contact)
  // This is not correct way to send data and imge please do some modification
  if(!contact.isGroup){
    image=contact.participants[1].avtar //not correct way to send image need to find other way
  }
  // if we want to add more fields in object then we need to first add in 
  // interface then we will able add that field in object
  let data:contacts={
    id:contact._id,
    name:contact.name,
    image:image,
    isGroup:contact.isGroup,
    participants:contact.participants.length,
    recievers:contact.participants
  }
  this.contactService.currentContact(data)
}
openCloseMenu(){
  console.log("is menu  opended function called")
  this.isMenuOpended=!this.isMenuOpended
}
logout(){
  Confirm.show(
    'Logout Confirm',
    'Are You sure You want to Logout?',
    'Yes',
    'No',
    () => {
      this.userService.userData$.next({ id: 0, firstName: '', lastName: '',avtar:'' })
      localStorage.removeItem("userData");
      this.contactService.currentContact$.next({ id: 0, name: '', image: '',isGroup:false,participants:2 ,recievers:[]})
      this.socketService.destroySocket()
      return
    },
    () => {
    return
    },
    {
    },
    );
}
}
