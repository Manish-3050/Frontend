export interface contacts {
    id: Number;
    name: string;
    image: string;
    isGroup:boolean;
    participants:Number;
    recievers:Array<any>;
  }

  export interface userDatatype {
    id: Number;
    firstName: string;
    lastName: string;
    avtar: string;
  }