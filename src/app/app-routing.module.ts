import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserAddComponent } from './components/user/user-add/user-add.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { RepotuserComponent } from './reports/repotuser/repotuser.component';
import { UserListCritereComponent } from './components/user/user-list-critere/user-list-critere.component';

const routes: Routes = [
  {
    //path: '',component :LoginComponent
    //component :AddEmployeeComponent
    path:'',component: RepotuserComponent
  },
  {
    path: 'login',component :LoginComponent
  },
  {
    path: 'repotuser',component :RepotuserComponent
  },

  {
    path: 'admin',component :AdminComponent,
    children:[
      {path:'',component: UserListComponent},
      {path:'dashboard',component: DashboardComponent},
      {path:'add-user',component: UserAddComponent},
      {path:'userlist',component: UserListComponent},
      {path:'user-list-critere',component: UserListCritereComponent},
      {path: 'user-profile/:usersPkId',component :UserProfileComponent},
    ],
    //canActivate:[AuthGuardService]
  },  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
