import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { contacts } from '../../models/model';
import { ContactsService } from 'src/app/services/contacts.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  
  public messages:any=[]
  public userId:any='661117761258312bf279c989'
  datas=[1,2,3,4,5,6,7,8,9]
  public currentContact:contacts | undefined
  constructor( public contactService: ContactsService){
    this.contactService.currentContact$.subscribe((res)=>{
      // console.log("coming data",res)
      this.currentContact=res
      this.getMessages(this.currentContact.id)
      console.log("this.currentContact",this.currentContact)
    })
  
  }

















  getMessages(chatId:any){
    // this function will retrive the messages of the chat
    console.log("messages",chatId)
    this.contactService.getMessages(chatId).subscribe((res:any)=>{
      this.messages=res.data
      console.log("messages of this chat",this.messages)
    })
  }
}
