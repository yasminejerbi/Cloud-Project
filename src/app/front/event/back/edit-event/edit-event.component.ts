import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TYPE, events } from 'src/app/model/event';
import { sponsors } from 'src/app/model/sponsors';
import { EventService } from 'src/app/services/event/event.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent {
  id!: number;
  eventToEdit!:events;
  sponsorsGRP: sponsors[] = []
  imgSrc: string = '/assets/img/';
  selectedImg : any;


  RegisterForm=new FormGroup({
  
    nom : new FormControl(''),
    lieuEvenement : new FormControl(''),
    actionEvenement : new FormControl(''),
    dateDebut : new FormControl(''),
    dateFin : new FormControl(''),
    numPlaces : new FormControl(''),
    photo : new FormControl(''),
    eventType : new FormControl(''),
    sponsors : new FormControl([]),

    

})
  constructor(private eventService: EventService, private Act : ActivatedRoute,private router:Router) { };
  loadSponsors():void {
  
    this.eventService.listSponsors().subscribe(sponsors => {
            this.sponsorsGRP = sponsors});
          
        
    }
  
  /*loadEvent(): void {
    
  this.eventService.getEvent(this.id).subscribe((event: any) => {
    this.eventToEdit = event;
    this.imgSrc = this.imgSrc+this.eventToEdit.photo;
  });
  
}*/
loadEvent(): void {
  this.eventService.getEvent(this.id).subscribe((event: any) => {
    this.eventToEdit = event;
    this.imgSrc = this.imgSrc + this.eventToEdit.photo;
    // Initialize form values with event data
    this.RegisterForm.patchValue({
      nom: this.eventToEdit.nomEvenement,
      lieuEvenement: this.eventToEdit.lieuEvenement,
      actionEvenement: this.eventToEdit.actionEvenement,
      dateDebut: this.eventToEdit.dateDebut.toISOString().substring(0, 10), // Assuming date format is YYYY-MM-DD
      dateFin: this.eventToEdit.dateFin.toISOString().substring(0, 10), // Assuming date format is YYYY-MM-DD
      numPlaces: this.eventToEdit.numPlaces.toString(),
      photo: this.eventToEdit.photo,
      eventType: this.eventToEdit.eventType.toString(),
    });
  });
}
OnEditSelectedFile(event:any) {

  if(event.target.files && event.target.files[0]){
    
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0])
    reader.onload = (e:any) => this.imgSrc = e.target.result
    this.selectedImg = event.target.files[0];
    console.log(this.selectedImg);
    
    
  }
}
submitEdit(): void {
  
  if(this.RegisterForm.valid) {
  this.eventService.updateEvent(this.id,this.eventToEdit,this.selectedImg).subscribe((updatedEvent: events)=>{
    this.eventToEdit.nomEvenement = updatedEvent.nomEvenement;
    this.eventToEdit.lieuEvenement = updatedEvent.lieuEvenement;
    this.eventToEdit.actionEvenement = updatedEvent.actionEvenement;
    this.eventToEdit.dateDebut = updatedEvent.dateDebut;
    this.eventToEdit.dateFin = updatedEvent.dateFin;
    this.eventToEdit.numPlaces = updatedEvent.numPlaces;
    this.eventToEdit.photo = updatedEvent.photo;

  })
  this.show(TYPE.SUCCESS,"Event Edited successfully","Success");  
this.router.navigate(['/event']);

}
else {
  this.show(TYPE.ERROR,"You need to fill all fields as required","Error");
  alert("fill all fields as required");
}
  
}
/*-----sweetalert---*/
show(typeIcon = TYPE.SUCCESS,message:string,title:string) {
  Swal.fire({
    title: title,
    text: message,
    icon: typeIcon,
    confirmButtonText: 'Ok'
  });
}

  ngOnInit(){
    this.id = this.Act.snapshot.params['id'];
    this.loadSponsors();
    this.loadEvent();
  }
}
