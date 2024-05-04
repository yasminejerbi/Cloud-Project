import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ClubService } from '../services/club.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { RecrutementID } from '../model/RecrutementID';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../model/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
listUser!:User[];
userId!:any;
  constructor(
    private formBuilder: FormBuilder,
    private service: ClubService,
    private serviceUser:UserService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject MAT_DIALOG_DATA to access data passed from the dialog
  ) {}

  RegisterForm = new FormGroup({
    nomCandidat: new FormControl('', [Validators.required, Validators.minLength(3)]),
    poste: new FormControl('', [Validators.required, Validators.minLength(3)]),
    date: new FormControl('', [Validators.required]),
    recrutementStatus: new FormControl('', [Validators.required])
  });

  persist() {
    if (this.RegisterForm.valid) {
      const formData = this.RegisterForm.value;
      
      // Retrieve club ID and user ID from the data object passed from the dialog
      const clubId = this.data.clubId;
      //console.log(this.listUser);
      for(let i=0;i<this.listUser.length;i++){
        if(this.listUser[i].nomUtilisateur==this.RegisterForm.value.nomCandidat){
          //console.log(this.listUser[i].id);
           this.userId=this.listUser[i].id;}
      }
      //const userId = this.data.userId; // Assume userId is passed from the dialog
      console.log(this.userId);
      const idCompose: RecrutementID = new RecrutementID();
      idCompose.idClub = clubId;
      idCompose.idUtilisateur = this.userId; // Use the retrieved user ID

      const RecData: any = {
        nomCandidat: formData.nomCandidat,
        poste: formData.poste,
        date: formData.date,
        recrutementStatus: formData.recrutementStatus,
        id: idCompose,
      };

      console.log(this.RegisterForm.value);
      this.service.ajoutRecrutement(RecData).subscribe(
        (response) => {
          console.log('recrutement ajoutée avec succès :', response);
          // Optionally, provide feedback to the user that registration was successful
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de l\'ajout du recrutement :', error);
          // Check the error status and handle it appropriately
          if (error.status === 400) {
            // Bad request error, handle validation errors or other issues
            // You can access error.error to get the detailed error message from the server
            // Provide feedback to the user about the error
          } else {
            // Handle other types of errors (e.g., server down, network error)
            // Provide appropriate feedback to the user
          }
        }
      );
    }
  }

  ngOnInit() {
    this.serviceUser.getAll().subscribe(
      { next: (data) => this.listUser=data,
        error: (err) => console.log(err),
        complete: () => console.log('done')
      });
  }
}
