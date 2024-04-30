import { Component, ViewChild,ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { contacts } from '../../models/model';
import { ContactsService } from 'src/app/services/contacts.service';
import { UserService } from 'src/app/services/user.service';
import { SocketService } from 'src/app/socket/socket.service';
import { NgForm } from '@angular/forms';
import { userDatatype } from '../../models/model';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  message: any;
  public userData:any
  public messages:any=[]
  public userId:any=''
  // datas=[1,2,3,4,5,6,7,8,9]
  public currentContact:contacts | undefined
  @ViewChild('f')
  formMessage!: NgForm;
  // const inputBox = document.getElementById('input-box');
  @ViewChild('myDiv')
  myDiv:any

  constructor( 
    public contactService: ContactsService,
    public userService:UserService,
    public socketService:SocketService
  ){
    this.contactService.currentContact$.subscribe((res)=>{
      // console.log("coming data",res)
      this.currentContact=res;
      if(this.currentContact.id!=0){
        this.getMessages(this.currentContact.id)
        console.log("this.currentContact ***********************************",this.currentContact)
      }
    })
    this.userService.userData$.subscribe((res)=>{
      this.userId=res.id
      this.userData=res
    })
    /////////////////////////////////////////////////
  }
  ngOnInit(){
    this.getNewMessageFromSocket();
  }

  
  sendMessage(f:any){
    // console.log("user dataa checking ",this.userData)
    if(this.currentContact && this.currentContact.id){
      if(this.currentContact.isGroup){

        Notiflix.Notify.failure('you can only send msg to individuals as per now, we will update you soon');
      }else{
        var recevierId
        if(this.currentContact?.id && !this.currentContact.isGroup){
         let recevier=this.currentContact.recievers.find((res)=>res._id != this.userId)
         recevierId=recevier._id
          // console.log("receiver data ",recevier)
        }
        // send socket data like
       let socketData={
          senderDetails:{
            _id:this.userData.id,
            avtar:this.userData.avtar,
            firstName:this.userData.firstName,
            lastName:this.userData.lastName
          },
          senderId:this.userData.id,
          receiverId:recevierId,
          isGroup:this.currentContact?.isGroup,
          chatId:this.currentContact?.id,
          contentType:'text',
          content:this.formMessage.value.message
        }
        if(!socketData.chatId) return
        // console.log("getting msg from input box",this.formMessage.value)
        // console.log("sending message data values",socketData)
        this.socketService.sendNewMessage(socketData)
        this.messages.push(socketData)
        this.scrollBottom()
      }
    }else{
      Notiflix.Notify.warning('Please select any chat to send message');

    }
    f.resetForm();
  }

  getMessages(chatId:any){
    // this function will retrive the messages of the chat from api
    // console.log("messages",chatId)
    this.contactService.getMessages(chatId).subscribe((res:any)=>{
      this.messages=res.data
      this.scrollBottom()
      console.log("messages of this chat",this.messages)
    })
  }

  getNewMessageFromSocket(){
    this.socketService.socketEvents().subscribe((res:any)=>{
      if(this.currentContact?.id && this.currentContact?.id ==res.data.chatId){
        console.log("new message aya hai ",res.data.content)
        this.messages.push(res.data)
        this.scrollBottom()
        console.log("total message of the group",this.messages)
      }
    })
  }
//////////////////////////////////////////////////////////////////
scrollBottom(){
  setTimeout(() => {
    this.myDiv.nativeElement.scrollTop =this.myDiv.nativeElement.scrollHeight
  }, 100);
}

}
