import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ForumComponent } from './forum/forum.component';
import { EventsComponent } from './events/events.component';
import { ClubsComponent } from './clubs/clubs.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [

  //route par defaut
  {path:'' , redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component : HomeComponent },
  { path: 'forum', component : ForumComponent },
  { path: 'events', component : EventsComponent },
  { path: 'clubs', component : ClubsComponent },
  { path: 'complaints', component : ComplaintsComponent },
  { path: 'login', component : LoginComponent },
  { path: 'profile', component : ProfileComponent },
  { path: 'contact', component : ContactComponent },

    //route parametré
/*
  { path: 'detail/:id' , component : DetailProductComponent},
  { path: 'appartement/:id' , component : AppartementComponent},*/
  //route NotFound
  {path:'**' , component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
