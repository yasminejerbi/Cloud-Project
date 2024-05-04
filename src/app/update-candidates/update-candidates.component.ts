import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidatesService } from '../services/candidates.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recrutement } from '../model/recrutement';
import { RecrutementID } from '../model/RecrutementID';
import { ClubService } from '../services/club.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/User';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-candidates',
  templateUrl: './update-candidates.component.html',
  styleUrls: ['./update-candidates.component.css']
})
export class UpdateCandidatesComponent {

  constructor(private candidatesService:CandidatesService,
    private rt:Router,
    private serviceUser:UserService,
    private activatedRoute :ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any ) { }

  id!:RecrutementID
  candidate!:Recrutement
  RegisterForm = new FormGroup({
    nomCandidat : new FormControl('',Validators.required),
    poste : new FormControl('',[Validators.required,Validators.minLength(6)]),
    date : new FormControl('',Validators.required),
    recrutementStatus : new FormControl('',Validators.required),
  })


  ngOnInit() {
    this.id = this.data.id;
    console.log(this.id) // Retrieve ID from dialog data

  // Call getRecrutementId with this.id and pre-populate form
  this.candidatesService.getRecrutementId(this.id).subscribe(
    (data) => {
      this.candidate = data;
      console.log(this.candidate)
      // Use this.candidate to pre-fill your form controls
    },
    (error) => {
      console.error('Error fetching candidate:', error);
      // Handle errors (e.g., display error message)
    }
  );
  
  }
  
  save(){ 
    if (this.RegisterForm.valid) {
      const formData = this.RegisterForm.value;
      
      // Retrieve club ID and user ID from the data object passed from the dialog
      this.id = this.data.id;

      const RecData: any = {
        nomCandidat: formData.nomCandidat,
        poste: formData.poste,
        date: formData.date,
        recrutementStatus: formData.recrutementStatus,
        id: this.id,
      };

      console.log(this.RegisterForm.value);
      this.candidatesService.modifierCandidate(RecData).subscribe(
        (response) => {
          console.log('recrutement modifié avec succès :', response);
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

  persist() {
      //  //3- recuperation de l'id
       

      //  console.log(this.id.idClub);
      //  console.log(this.id.idUtilisateur);


      //  //4- recuperation du produit par id
      //  this.candidatesService.getRecrutementId(this.id).subscribe(
      //    (data)=>{
      //      this.candidate=data,
      //      //5- remplir le formulaire par les données du produit
      //      this.RegisterForm.patchValue(this.candidate as any)
      //    }
      //  )
    }
  }
