import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute , Router} from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';

import { TYPE, events} from 'src/app/model/event';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-ajout-event',
  templateUrl: './ajout-event.component.html',
  
  styleUrls: ['./ajout-event.component.css']
})


export class AjoutEventComponent {
  
  constructor(public eventService: EventService) {}
  imgSrc!: string ;
  selectedImg : any;
  RegisterForm=new FormGroup({
  
    nom : new FormControl('', [Validators.required]),
    lieuEvenement : new FormControl('', [Validators.required]),
    actionEvenement : new FormControl('', [Validators.required]),
    dateDebut : new FormControl('', [Validators.required,]),
    dateFin : new FormControl('', [Validators.required]),
    numPlaces : new FormControl('', [Validators.required,Validators.pattern('^[0-9]*$')]),
    photo : new FormControl(null),
    eventType : new FormControl(''),

    

})

/*private dateRangeValidator(): ValidatorFn {
  return (): {[key: string]: any} | null => {
    let invalid = false;
    const from = this.RegisterForm && this.RegisterForm.get("dateDebut")?.value ;
    const to = this.RegisterForm && this.RegisterForm.get("dateFin")?.value;
    if (from && to) {
      invalid = new Date(to).valueOf() > new Date(from).valueOf();
    }
    return invalid ? { invalidRange: { from, to } } : null;
  };
}*/

/*loadSponsors():void {
  
this.eventService.listClub().subscribe(clubs => {
        this.ClubGRP = clubs});
      
    
}*/
OnSelectedFile(event:any) {
  if(event.target.files && event.target.files[0]){
  
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0])
    reader.onload = (e:any) => this.imgSrc = e.target.result
    this.selectedImg = event.target.files[0];
    console.log(this.selectedImg);
    
    
  }
}

submit():void {
    const formData = this.RegisterForm.value;
    if (this.RegisterForm.valid) {


      const newEvent: any = {
        nomEvenement: formData.nom,
        lieuEvenement: formData.lieuEvenement,
        actionEvenement: formData.actionEvenement,
        dateDebut: formData.dateDebut,
        dateFin: formData.dateFin,
        numPlaces: formData.numPlaces,
        photo: null, // Initialize photo as null
        eventType: formData.eventType,
      };

      if (this.selectedImg) {
        newEvent.photo = this.selectedImg.name; // Set photo only if an image is selected
      }


      this.eventService.createEvent(newEvent, this.selectedImg).subscribe(() => {
        console.log(newEvent);
        
      });
      this.show(TYPE.SUCCESS,"Event added successfully","Success");
    } else {
      this.show(TYPE.ERROR,"You need to fill all fields as required","Error");
      
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

ngOnInit() {
  
}

}
