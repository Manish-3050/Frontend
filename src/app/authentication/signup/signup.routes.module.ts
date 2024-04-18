import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { NgModule } from '@angular/core';

const signroutes: Routes = [ 
    {
      path:'abcd',
      component:LoginComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(signroutes)],
    exports: [RouterModule]
  })
  export class SignupRoutingModule { }