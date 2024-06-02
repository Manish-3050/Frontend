import { Component, ViewChild } from '@angular/core';
import { UserService } from './services/user.service';
import { userDatatype } from './models/model';
import { SocketService } from './socket/socket.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Foodordering';
  @ViewChild('videocallModal') videocallModal: NgbModal | undefined;

  public user:userDatatype={ id: 0, firstName: '', lastName: '',avtar:'' }
  constructor(
    private userService:UserService,
    private socketService:SocketService,
    private modalService: NgbModal,
  ){
    this.userService.userData$.subscribe((res)=>{
      this.user=res
    })
  }
  ngOnInit() {
    const crendentials:any= localStorage.getItem("userData")
    const localStoragedata=JSON.parse(crendentials)
    if(localStoragedata!=null){
      this.user=localStoragedata
      if(localStoragedata!=null && this.user.id){
        this.userService.userData$.next( this.user)
        this.socketService.initSocket(this.user)
      }
    }
  }
  open() {
		this.modalService.open(this.videocallModal);
	}
}
