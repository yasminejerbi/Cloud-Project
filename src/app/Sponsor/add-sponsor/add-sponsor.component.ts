import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SponsorService } from 'src/app/services/Sponsor.service'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-sponsor',
  templateUrl: './add-sponsor.component.html',
  styleUrls: ['./add-sponsor.component.css']
})
export class AddSponsorComponent {
  sponsorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sponsorService: SponsorService
  ) {
    this.sponsorForm = this.fb.group({
      nomSponsor: ['', Validators.required],

      dureeSponsoring: ['', Validators.required],

      typeSponsoring: ['', Validators.required],

      dynamicFields: this.fb.group({  
        montant: ['', Validators.required],
        typeMateriel: ['', Validators.required]
      }),

      numTel: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      image: [null]
      
    });
    this.onTypeSponsoringChange();
  }

  onSubmit() {
    if (this.sponsorForm.valid) {
      const formData = this.sponsorForm.value;
  
      // Set montant to 0 if typeSponsoring is 'materiel'
      if (formData.typeSponsoring === 'materiel') {
        formData.dynamicFields.montant = 0;
      }
  
      console.log('Form Data:', formData);
      if (formData.typeSponsoring === 'financier') {
        // Set default value for typeMateriel
        formData.dynamicFields.typeMateriel = 'no_material';
      }
      console.log('Form Data after modification:', formData);
  
      console.log('Montant:', formData.dynamicFields.montant);
  
      this.sponsorService.addSponsor(
        formData.nomSponsor,
        formData.dureeSponsoring,
        formData.typeSponsoring,
        formData.dynamicFields.montant,
        formData.numTel,
        formData.email,
        formData.dynamicFields.typeMateriel, // Correctly access typeMateriel
        formData.image
      ).subscribe(
        response => {
          console.log('Sponsor added successfully:', response);
          this.router.navigate(['/listSponsor']);
        },
        error => {
          console.error('Error adding sponsor:', error);
        }
      );
    }
  }
  
  
  

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.sponsorForm.patchValue({
        image: fileInput.files[0]
      });
    }
  }

  onTypeSponsoringChange() {
    const dynamicFieldsGroup = this.sponsorForm.get('dynamicFields');
    const typeSponsoringControl = this.sponsorForm.get('typeSponsoring');
    
    if (dynamicFieldsGroup && typeSponsoringControl) {
      typeSponsoringControl.valueChanges.subscribe(value => {
        if (dynamicFieldsGroup && dynamicFieldsGroup.get('montant') && dynamicFieldsGroup.get('typeMateriel')) {
          if (value === 'financier') {
            dynamicFieldsGroup.get('montant')?.enable(); // Access nested form control
            dynamicFieldsGroup.get('typeMateriel')?.disable(); // Access nested form control
          } else if (value === 'materiel') {
            dynamicFieldsGroup.get('montant')?.disable(); // Access nested form control
            dynamicFieldsGroup.get('typeMateriel')?.enable(); // Access nested form control
          }
        }
      });
    }
  }
}