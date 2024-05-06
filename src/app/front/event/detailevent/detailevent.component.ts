import { Component } from '@angular/core';
import { ActivatedRoute, EventType } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
import { TYPE } from 'src/app/model/event';
import { User } from 'src/app/model/User';
@Component({
  selector: 'app-detailevent',
  templateUrl: './detailevent.component.html',
  styleUrls: ['./detailevent.component.css']
})
export class DetaileventComponent {
  id!: number;
  eventSearched!: any;
  user:any;
  isUserAssigned = false;
  constructor(private eventService: EventService, private Act : ActivatedRoute,private modalService: NgbModal) { };
  idUser: number =1
  placesAvailable!:number
  loadEvent(): void {
  this.eventService.getEvent(this.id).subscribe((event: any) => {
    this.eventSearched = event;
    
  });
  this.eventService.getUserById(this.idUser).subscribe((user: any) => {
    this.user = user;
    this.checkIfUserAssigned();
  });
}
/*-----aSSingn user----*/
onAssign() {
  if (!this.isUserAssigned) {
    const userIds = this.user.evenements.map((event: { id: any }) => event.id);

    if (userIds.includes(this.eventSearched.id)) {
      this.isUserAssigned = true;
      
    } else {
      this.eventService.assignUserToEvent(this.eventSearched.id, this.user.id)
        .subscribe(
          () => {
            console.log("User assigned");
            this.isUserAssigned = true;
            this.toast(TYPE.SUCCESS,"User is assigned successfully")
            
          },
          error => console.error("Error assigning user to event:", error)
        );
        
    }
  } else {
    this.toast(TYPE.WARNING,"User is already in this event")
    console.log("User is already assigned to this event");
  }
  
}
  checkIfUserAssigned() {
    const userIds = this.user.evenements.map((event: { id: any }) => event.id);
    this.isUserAssigned = userIds.includes(this.eventSearched.id);
    
  }
  /*---sweet Alert----------*/
  toast(typeIcon = TYPE.SUCCESS,message: string, timerProgressBar: boolean = false) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 5000,
      title: message
    })
  }
  /**trimming */
  splitTextIntoLines(text: string, lineLength: number): string[] {
    const lines = [];
    for (let i = 0; i < text.length; i += lineLength) {
        lines.push(text.slice(i, i + lineLength));
    }
    return lines;
}
  ngOnInit(){
    this.id = this.Act.snapshot.params['id'];
    this.loadEvent();
    
    

  }
  
}
