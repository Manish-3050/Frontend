import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket: any;
   granted = false;
  baseUrl = `${environment.apiUrl}`;  
  constructor() {
    // this.initSocket('manish')

if (Notification.permission === 'granted') {
    this.granted = true;
} else if (Notification.permission !== 'denied') {
    let permission = Notification.requestPermission();
    // this.granted = permission === 'granted' ? true : false;
}
   }

  initSocket(data :any) {
    this.socket = io(this.baseUrl, {
      query: data,
      'forceNew': true,
      'reconnection': true,
      'reconnectionDelay': 1000,
      'reconnectionDelayMax': 5000,
      'reconnectionAttempts': Infinity,
      transports: ["websocket", "polling"],
      withCredentials: true
      secure: true
    });
    this.socket.on('connect', (data:any) => {
      console.log('socket connected',this.socket.id);
    });
    this.socket.on('disconnect', function () {
      console.log('client disconnected from server socket');
    });
    this.socketEvents().subscribe(
    (event: any) => {

      console.log(' socketEvents socketEvents:', event);
    });
  }

  destroySocket() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
  sendNewMessage(socketData:any){
    this.socket.emit('NEW_MESSAGE', socketData);
  }
  sendNewMessageInGroup(socketData:any){
    this.socket.emit('NEW_MESSAGE_IN_GROUP', socketData);
  }
  joinGroup(){
    this.socket.emit('JOIN_GROUP')
  }


  socketEvents = () => {
    return Observable.create((observer:any) => {
      if(this.socket){
        this.socket.on('NEW_THREAD', (data:any) => {
          observer.next({ name: 'NEW_THREAD', data: data });
        });
        this.socket.on('NEW_MESSAGE', (data:any) => {
        console.log('data @@@@@@@@@@@:', data);
           observer.next({ name: 'NEW_MESSAGE', data: data });
           const notification = new Notification('JavaScript Notification API', {
            body: 'This is a JavaScript Notification API demo',
            icon: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALcAxAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAgMEBQYBBwj/xAA9EAABAwIDBAkCBQMCBwEAAAABAAIDBBEFEiETMUFRBiJhcYGRobHwMsEUQlLR4RUjYnLxByQzQ1OSwoL/xAAaAQADAQEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAJBEAAgIBBAMBAAMBAAAAAAAAAAECEQMSEyExBDJBUSJhgQX/2gAMAwEAAhEDEQA/APWV1dXUgOIsmaurgoad9RVzxwws+p8jtAsnUf8AEjA4qgwx/iZg3fJGwZT6oA2dl0BZOn/4hdHp3Na6pljcf/LEfcXVielmCNy2xKI5he7Q428h7opitF7ZNy9UXTFBiVHiLC6iqYp2jfkI9U3XyFkZtuSbopKyBi1W2JpOZYnGa0Sk5eauMUD6guDnaLPyUTi/KFDZsolNILyXPNON/wBSsZKC2mXcoFSNm145aJWOhqolcxhVZHNNPWNaNwKnU8m2gy8tF2KFsFWx/NFhRpsKhlDA7kFd0xN9XXPJVFDI5zbDcrimZdt0rE0WMUjWMUWplMl2s4qRT0zn2UtmHX1VEEPDIC1wJ3rRU46iiU9LsyrCNugVIhhbRIIT1lzKqFQyWIDE9ZFkBQ3lQnLIQFCLI+k6WuVlYuldM/8A7jf/AGVP0w6YOiww0uHPH4ipBGcf9tnE/OalOy5KkZr/AIn9Jm4niTcOpZiaOlOZ+X6ZHjj4fusC6SziA/W/AlEj2OfK4OLgX5QSNCP9ydCms99dPDW/d81Fwt0qRyt2yQyTqnMNeDs3zt+b3I6iSJwMcuvHL87FEvex32PwfO5dD7gbj47/AJz+yBo0GHdIa7D52yRyXI47iPEBbGi6evqodnVhrnW+oWB/ZeYF+o4/f56d2oeilylS0mUpNdHoVZ0iyHr6RnceBTdPjUczwc25ZGCvs3ZvN4zvbcBKmpg+EyYe5zid0ZOvgVi8f4dEMt9m4nxGNzVQ4nMJQ8Dcsf8A1WWOSxc8FumqfONF7Dncp0tF60y4w2TIw9hVtTRtnnYXc1jIsSIuWO3q3wvFiSwvduSaY4yR6RSRxRMv2KbT1Jzhg3cFS4RXCqyhvILU0lI11nHfZQ2W0qLTDNytmhtgqmDLFZOnEI2fmWiZk0WYYlWUOmropbBrtVLzNV2jPSztlyy4ZGobI1xsiwo7ZFkIunYUCF1CLCj5Vp5ZzI2OJ7s7zlDbnipuJ1WzAhYfpbkLr8u3vPqoGDPvPLMHZdjG5wP+R0H38lyeSGI3kOY2G7gL/wArRIwlIi02Z5lAboHXv32/3unw3Wx056677AX7/dRhUPc3QAEmwA5ka+oQHGQAH83pf+bpgkSBl3uIItfs7R90sm3b2u49p7Dr5Jljif7h0cdSTvvucPnYnAA3Sxyt0v8A4nd5e6THR0H9TTY677nTlyI3LoseItxNtLfYey4L5SCLON724P8A57vdAdxLQANbdhFnN++/ikNDzHO4Xvx9d/n91Ihmcxws7W+vz5+0RuYOsSc19TyP5T9k4xw0ykNbpY8h/B9D2pWOiZXUMOKNc4O2dUBYODbNfbgdPVZaaKWCUxSt2cjTqCtJG+2t3c8oHfz7j5dqTidF/UKbaMH/ADEDdDb628jbf/uEDRnmb1LhkdHZ3JRHNyP1BHYU803SZSNR0e6QPpZbP+ngvQMN6W0+y1kaDZeMtOU3Q+d36nLN47NI5KR7TXdM4I4c21bp2rH4x08dKCKfMDfeOK8+knc7TM5MF6qOMiWVvo9Q6IdOZRPs6p2/cvSI+lUGwa/NwXzVDM6N4c05bK4hx6pEOzL9ALBKWPngcMiS5PZK3p7TRkgSNuBY6pWC9O6aqcQZN2i8Iq6x87ruck01ZLA68TrdqNsW7z0fTcPSikfb+63zTVX0qpIjd0mi+c24xVslEu3dmHal1nSCsqmgPktY3uN6W3L9K3Y/h9GxdJaWSMOEuhQvnqm6UVsMQZnuBuKEbcv0NyP4M4bJs8LqX/8AklDfAC/3UOoe6R0nabfPMKTYx4bTxHeXPd62UEu4+PzyXQc443K3fwF/UH9/JOZnG7W6bwDw11B9PRMiTL4a/b53JVi0ZeLRbxG70+6AJLJG6EDS+ax7dD87E41wtYm4b1SP8fBRWkA3HA3006p+eqcY4dVrtw/tvHZwUspEkX3E3/KD2jUdi6JPzfm+p3sVGdIRqHXc5u7S+Zu753JwC5OY5GlxA7NNxCQxzN+UaflB9WlOMLiLlu9p8vzD2UZp6oMTCHuGjnHW44A+m/mnR1rlzrgkPHaDv+6BktsjQCLlzgbAD8x0Pra/f2p2KV1hspCBbTJpffb09vOIywu0jUWGYcOR9U8H666emUcu6490gGcfhfLFBU3L7HZvPHs+6qmh2U23LSU5ZMHQyjqSDLYXNj/B9k0MNAJB3jeplOiow1GdDZEGORaVmHx3Tv4CJTuovZZkzA79KT+Gkv8AStd+BiXW0UbTdG8PYMmKOQ65U6ygmctY2CGyW1kQNkboLAvplBhUqcbg0p1WpBiGmVK20Y0yqdxj2YmY/ocqBgci0rquMaZUg1sf6UKcg24FCMDfZCuziDEJ65C24Ffj1MyGOJ35QHNHjZUDtND8HwlaTpC69CHfpf8Av+yy5dr8+cStsbekwyqpsWNd+4/e497JecXv3OPhofnekNjkdubYHidNDb+CljIyznOzkEHKN3arIHAGkkflbo4b7A7j90uxAO1dya+wvbkb8OCbDnBoBAbHbKWjiDx+FLawOyg3IH9t2bhyPzmEmUhQcC4Rt0LrgknW/f8ANy60OeLHUkXF+Lh8t5rjetbUXNgTycN3zsK7dzgSAdbPAHMfV87Uih24+qLVx64+4+c13MGg7i1tiLne13Py8gkgcW/S3rg8COPt7JYaG8btZu7Wn9vspGLYS1xaTa3UvxH6T8PFOZuJJ58jus729N6ZJFsjnXv1C4+hUyiw+vrbGnhLQ7rXfoONxr3clMpKKtlQhKTpBG4sIdezidTbdv117ifFWEtQ12V35i0OK5VYE6lpny1NQ5xa0ENDbDeBvP7qCXggNAsBoFnrjPo1eOeN/wAiR+Itokuq1FISCEqQnJkxtVqh1UoaLp6UGpkh1UufikxZdyIpE6pDxqU26dNuYmi3VUkhOUh0zJt0ySWpBYnSIbYoyuuhIMa4nwK2WuOVccNK2F8LXh5zXduvfs+arPOqQDaJjGk8m937LRY2Gy0AH6JB7FZwsaAPD56K8fqLJ7CC57tX7tx7uKUARu0tw5nj6fZGXMLDj1fcfYJTcziHjmHDx0+eCsgU0hulrt+k9x+WSs1h1zckZb8jwPufJIY3Qdt2n7Lhe1oFuPoUUFjwJdq4/VwP6h8A807TgyTBjXWc7rNdxHP9/JV75+LdDv7ir7ovRPefxD2Xa7Rttco4938KJy0qzbDHVNI2PR7BMNfTMnngDTH+vUq3mqMMpIupG0NaNSQNw3qvxOphoMHOZwAIuQOKymE0GIYnJ+IxGR7mm2SI8e0heZUp226R7aWPG1FK2XWK4PLPG/FMBhiM4GaSHKDn7uTvf3zcNVjNQ9394U7HfkBJ07rr0bDaSGCm2ck7oXOtZzHZSqSu6NV9KIv6dUsq6Jri4Rvaxj2due3W8VtgyQ9ZnJ5mKftjXBEwyjjmxFkz9oXSSXe3auy6nUAXtbW1lpqzBcFqKYxNhgiJGZr42hrx++4qkweeip5xLiUuzjhbtJbuAAtuBPabDturtuP4bJCJ4Y22OjXyjKHcLNz2B8F2ul0eatT7KdnQ2kbTTVFRjlPC2K//AFQGXPZdwWPlIa4NBBHMHQrX4x0kpK2KbDp8LmkgcQ2Rkez0AN7gtNtN47VR1keGVQpRgwjij2Vy2Vxz5s1rEm+oA0CzkvppFt8FVexRdTqrDKuljEj25mkaubqG9/EKARbRZp2aOLXAoJWfRNosmKjpckroCVwQhciQEsR3SL6pbXJ2FHdkhLzoSsNKF1j2OohHmzPe7MQO4/7qmkYy7rG44Hnu/f0UB08lv+q5ySZJH68vn2HkulUlRzSuUrJrtk25PIX7sxumnzt3HlY+6i9+9cTsKHZJ3O/lNEoQgaFwgF4HEkAd63GEsfQxROMpYIh9J1APHiCLnkQshhAaa5hdvbqO/wCH0W1o2mYMi/NvXNmOzxUhvYVOL4m+uqi0Q580UQBy+W/z1WvwumbHHmcGtA5pqgpI9GjcNSm8c2r4/wANSTGLO3KXN1cO5cE56nS6PVjDSv7KfpdikkU0UNI3bvc7VgGlv5/dS8NxCqjhafw2yzDUFwIZ3rmD4IynOrTm0Be83PmVYVc9HTubEXMzEWPKyl6UqNYavr/wytfikJw3FHVDGVDfxjGxxuJylzWv3i+o1v4dyzE1aXWmbNI+skuDK42LByaLaE34btwTmOZqaaroZNCap01+wt6vuqwPLdQWdVtrG2uv7L1sfqj53N7tEgSzOY6EykRMBL2tNgRy7b6BEbXyU8k4MTIY+qM+uY78oFtT2+qbuIsOJOhlmynuaL//AGPJSqpkULWtlc12SMNa0Cxzcb+N/IKnKiIwssMBx7EcNiExeZ6EPEckbnZizkewb7c7EKVXyRS1kslPbZPdmZbdY/ys/hZDqh0EsmSOeNzXkuDQdLi5O7rAFT8M69HEX8L281jOCu0bwyNqmTQ3VKLWt1TbAiQuUGgOckEoDHHVKDEyWMk6pQKd2S5kQIShOtbouIGZkC+vJA+o9y446LoOmbwXScwlC7uXECOj6Skrt0IBk7B9KkyfoHz2WkwardFXZzuIsszhh67+4fdW0MmyN1z5laZ2eM6aZtqesdLII2HrH0CuaWGOx62d3E81hKCqeyUys4hXeH4u9jxnbvNlwzj8PVi75LTGJ6qBoZQ0hlkIvc9Vo8VmWUOMTVO3rXQHq2DW36vgttmbKxpzNFxdVWK4lQYbrUStznVreLu5RF1wkaxdNM886WtkZibXSfVs2h3rb2VG36Tx7S61lo+l0wqJIJ9BtQbAcMu73Pms4O1epgb20eF5aSzSAuLoWs4NcSO8gD7Kc6BtTVObAGFznudmLrAtNjbw+blBUuB1M+DIS6GpYeo9uokB0IOuhFz37jqtX0c6dMlYXFs8Qzt2bxA10rnFpymw791/daaiwSWo6OUlTTQESB7g5lvqGh8d/qs/QU34wNoaFkmeQ3qJj9OUEEWHLS9j2L07CIp6enbTbT+222UBm4WAte54ALl8jJppfTs8XA53L4YJrXMcWvBDmmxBFjddexaLpPh5iqhVfll0IPAgb/L2KoS3VRF2rHKOl0IYzQLuz1S8mXVczqieDhjSHRp5r2olLbICkRwxC4X6oTFwZQI4oQV1HIBQEIG9AAhCEwZLw7639w+6tGDqjvVZh4uHnkQraDrMaubKdnjk6nHVU6ljuA5u8FRYWuVrRQkkEbuK4puj1saJ8VRsmN2suRh0udbeayGLVcFfjsjQWCKmu3Nc5XgHV1tRfsGhstZjk7abBnhrsry2zCbb+zTxXl0mZr3CTeDYrXxseq2c3l53jaJOI1bKyoe8MyxtGWMcgoYC6BxG5KjFzl5ruSUVR5UpucrY3ZSoY4ixpLc0jtGjNZc/DPY4PcxzmdiSHls4dGCACSAeGqG2+EVBJPk2GDsjwSjOIF1srBcczwHn7rSdH+kn9UlLCAwAaC4BP7Lz7FKsVUlNEHaRx5nAnTMf4V1h2IUVI0Mjkj2hG/MLt9D6Lhni1K32z1Y54xk4/EaLpfUgGlp5Zgx0knU10Jtuvw371myxweQ8FrmmxB4FO4pVXh/qU7xM6FuWnjy9RrjpfX6uG8AdhT8jmz0kNWCx8hhZnI3OcRY37bjXvC0hDTBI4cs1ObojZ22TbtU3K5NiWyZLFHq6pt8qcu0i6bc3MmQI2qE4ItFxPgKZmcy4UEIK6TnOk6LgXF0fSUAFkAI4BDRqO9MGWuGRB1miOR4cRciQC3oVeQUADWOYZW316zc48xb2VThkO0dfO4NA6xB0CuqmWlpI2OqZC54F2EXF1MoRaCGWUXaLKlpmm4D2vI3lpvbwVlDTuiZf33LEUU1RPUyVrnhubcWm2W3bwV63HTTxtbKRNYXdd4Dmj77iuOfiO7TPSxf9FVUkV3THEstVT00ZuY2l7+QJ3e3qsu4GV5J1cOsfRaabo+yrL6x8lQ4y/wBwts0Ece1KjwGkOWQS1JDdCOpf2XRjUYKjkzTnllfwyTHWcBe7eSeZstp9cjd+jWi4TuL00NHXOihc9zRY9awt5KJvaCeB1WnZguGWolGxyMaT/qddR6+NzYgdNT+VoHsmdplAJ91x8udnWdoko0U5t9jLBqrGgyiQOvlsq6MtzjNuVhTlztIIJpNNcjSR81VNcE/2aLqVeGvgEjS43tm3a8VX9H6kx7fDaghu0ta/Yftv7r9iXBh0s+zFU9lJG86tL/7j3dlu8JGK4Oyia6SkbK18AbJt3P1ceOnPS4UJcUVf0l1dPJTO613Ru1Y7gf5UVWFJUjFMNcSQ2URBwDRYAsFj6HyP+KgH6gs2qZsnaEPe6yIy468k5INEhrmjRILodzoTRFzdCKDUZxC4hdBznULgXUACcgaXytDU2puHZWuuXDMXaAgnde2gHNNCl0WNCyWlkMlOx0sxNy3a5APC33XcYo6ieH8XIJ3Sk3dEbOyDncfZWOHZC5xaWvcTciJ3Wt/pOtlFxeobM6COgeSHh1ww6jnpz3pkIiQNpH0AeHNeGkNdHq1xKI4KaaURy0rYxwdE5xc3tNyQeKlYbSRV9MWHKJYXZWTRt1//AFzUqmw6op5NrKGSRMF820sB4n2UStGq0yGayXEKBkUMsm2p7tdBUNGvmrymmc7DoHTRsL9mMzmNIzXuQSs/h+HziqbTuzupg3NKHHKAzU3Pt4q+qDK1m1bFKQ9tyGNBawaWHap9ivXgxleW1E0zQ5u0ZIbEmxUAJVTc1Epc0tJebg7xqkBaIzHGiNxsc1+xoT2WJjSBDmcR1XPfp5JjgpLRE6C8RaJG2Lhkue07r8vVA0R6dz2TDJ9VtLalW7ppZsObE972v7RlF+GpI9FVNDvxjes1znu3jcbq1jo60OyxsEYfxAAPiR26pBdD7GRSU0Bfm2kYttRewtrvNreRVhHiUM7nRzNG1bGS2RwJadNRe1/IW9VAbhri0Plc5z2X1Fz4WUymp2bFhDC5zCLXabi2n3HyyVBqKt7n4LVUz2tbsXubI6I2Ni02c0HtHmCpdTEyOpfExxfEDma47y0i4K50niMtBSTt1Mbixw793t6qPHJmoKGQvc60boyD/i42t4EeSmSLjInsjzMso8sLmp2CfMbDcpZylixumaNWVW0tohOTNaXlCskznFBCELYyZxCEIEjoBLgG8VZUlIYyyWZ4DA4Fwtfq/dCFaJkSsea2CTa073A/iZAQDYNNm6BFHMK92Qhsk1tzwWu8Hj7oQl9D4SMMeKGsEIu4uPWgfvv2OGhWqMkNTCYZYbxty52O/VfQLqFnkLxdlTiksdPXMwulJDL/APMPfcnXgOy5UqtncahjYprRRsOdobvOXRCEh/TA1b9pPO+980rjfxTKELQkVfRcBc3VcQgBQcS5pO8HRXcLjHEJI5HZRrl5IQkBaROzwh1tX9XMTe4sLe90unnzxi2mgcw+lvP5xQhAgxFrZMHrWbhkDx2EW+ePeqqnjBwqj7Q93dd5H/yhCmXRURDXZE6Kl2RCFmkaNjJqdUIQqpCtn//Z'
        });
        });
        // this.socket.on('NEW_MESSAGE_IN_GROUP', (data:any) => {
        //   console.log('data @@@@@@@@@@@:', data);
        //     //  observer.next({ name: 'NEW_MESSAGE', data: data });
        //   });
        this.socket.on('EDIT_MESSAGE', (data:any) => {
          observer.next({ name: 'EDIT_MESSAGE', data: data });
        });
        this.socket.on('DELETE_MESSAGE', (data:any) => {
          observer.next({ name: 'DELETE_MESSAGE', data: data });
        });
        this.socket.on('TYPING_ON', (data:any) => {
          observer.next({ name: 'TYPING_ON', data: data });
        });
        this.socket.on('TYPING_OFF', (data:any) => {
          observer.next({ name: 'TYPING_OFF', data: data });
        });
        this.socket.on('ONLINE', (data:any) => {
          observer.next({ name: 'ONLINE', data: data });
        });
        this.socket.on('OFFLINE', (data:any) => {
          observer.next({ name: 'OFFLINE', data: data });
        });
        this.socket.on('MESSAGE_SEEN', (data:any) => {
          observer.next({ name: 'MESSAGE_SEEN', data: data });
        });
        this.socket.on('NEW_NOTIFICATION', (data:any) => {
          observer.next({ name: 'NEW_NOTIFICATION', data: data });
        });
      }
    });
 
  }


}
