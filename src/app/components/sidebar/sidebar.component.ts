import { Component } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { contacts } from 'src/app/models/model';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public contacts:any=[]
//  datas=[1,2,3,4,5,6,7,8,9]
 constructor( public contactService: ContactsService){
  this.contactService.getContacts().subscribe((res:any)=>{
    console.log("response ",res)
    this.contacts=res.data
  })

}

setCurrentContact(contact:any){
  let image='kkkkk'
  console.log("contact",contact)
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
    participants:contact.participants.length
  }
  this.contactService.currentContact(data)
}
}
