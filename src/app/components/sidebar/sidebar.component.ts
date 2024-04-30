import { Component, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { contacts } from 'src/app/models/model';
import { userDatatype } from 'src/app/models/model';
import { UserService } from 'src/app/services/user.service';
import * as Notiflix from 'notiflix';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { SocketService } from '../../socket/socket.service'
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
  public contacts: any = []
  public isMenuOpended: boolean = false
  public openSearchBox:boolean=false
  public userData: userDatatype = { id: 0, firstName: '', lastName: '', avtar: '' }
  //  datas=[1,2,3,4,5,6,7,8,9]
  constructor(
    public contactService: ContactsService,
    public userService: UserService,
    private socketService: SocketService,
    private renderer: Renderer2
  ) {
    this.userService.userData$.subscribe((res: userDatatype) => {
      this.userData = res
      // console.log("sidebar component user data",this.userData)
    })


    //THIS IS TO TOOGLE THE LOGOUT DROPDOWN
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.isMenuOpended) {
        if (e.target !== this.toggleButton.nativeElement && e.target !== this.menu.nativeElement) {
          this.isMenuOpended = false;
        }
      }
    });
  }

  ngOnInit() {
    const crendentials: any = localStorage.getItem("userData")
    const localStoragedata = JSON.parse(crendentials)
    this.contactService.getContacts(localStoragedata.id).subscribe((res: any) => {
      this.contacts = res.data
      console.log("contact list @@@",this.contacts)
    })
    this.getNewMessageFromSocket();
  }
  setCurrentContact(contact: any) {
    let image = 'kkkkk'
    let personName = ''
    console.log("contact setting@@@@@@@@", contact)
    console.log("user data @@@@@@@@@@@@@@@", this.userData)
    // This is not correct way to send data and imge please do some modification
    if (!contact.isGroup) {
      let person = contact.participants.find((res: any) => res._id != this.userData.id)
      image = person.avtar //not correct way to send image need to find other way
      // console.log("person",person)
      personName = person.firstName + ' ' + person.lastName;
    }
    // if we want to add more fields in object then we need to first add in 
    // interface then we will able add that field in object
    let data: contacts = {
      id: contact._id,
      name: contact.isGroup ? contact.name : personName,
      image: image,
      isGroup: contact.isGroup,
      participants: contact.participants.length,
      recievers: contact.participants
    }
    this.contactService.currentContact(data)
  }
  openCloseMenu() {
    // console.log("is menu  opended function called")
    this.isMenuOpended = !this.isMenuOpended
  }
  logout() {
    Confirm.show(
      'Logout Confirm',
      'Are You sure You want to Logout?',
      'Yes',
      'No',
      () => {
        this.userService.userData$.next({ id: 0, firstName: '', lastName: '', avtar: '' })
        localStorage.removeItem("userData");
        this.contactService.currentContact$.next({ id: 0, name: '', image: '', isGroup: false, participants: 2, recievers: [] })
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

  getNewMessageFromSocket(){
    this.socketService.socketEvents().subscribe((res:any)=>{
      console.log("getting msg in the sidebar########",res)
      const emitedMessageContactIndex= this.contacts.findIndex((lastMsg:any)=>lastMsg._id==res.data.chatId)
      console.log("is contact ke liye msg aaya hai",emitedMessageContactIndex)
      if(emitedMessageContactIndex){
        let element = this.contacts.splice(emitedMessageContactIndex, 1)[0];
        console.log("element element",element)
        if(element.lastMessages){
          element.lastMessages.content=res.data.content,
          element.lastMessages.contentType=res.data.contentType,
          element.lastMessages.senderDetails=res.data.senderDetails,
          element.lastMessages.senderId=res.data.senderId
          //need to update this key as dynamically
          element.lastMessages.createdAt="2024-04-27T19:52:10.502Z"
          this.contacts.splice(0, 0, element)
        }else{
          element.lastMessages=res.data
        }

      }
    })
  }
}
