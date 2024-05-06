import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ForumComponent } from './forum/forum.component';
import { EventsComponent } from './events/events.component';
import { ClubsComponent } from './clubs/clubs.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DetaileventComponent } from './front/event/detailevent/detailevent.component';
import { AjoutEventComponent } from './front/event/back/ajout-event/ajout-event.component';
import { EditEventComponent } from './front/event/back/edit-event/edit-event.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { MapComponent } from './front/event/map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    ForumComponent,
    EventsComponent,
    ClubsComponent,
    ComplaintsComponent,
    ContactComponent,
    NotFoundComponent,
    ProfileComponent,
    DetaileventComponent,
    AjoutEventComponent,
    EditEventComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule,
    MatPaginatorModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
