import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SponsorService } from 'src/app/services/Sponsor.service';
import { Sponsors } from 'src/app/model/Sponsors';

@Component({
  selector: 'app-update-sponsor',
  templateUrl: './update-sponsor.component.html',
  styleUrls: ['./update-sponsor.component.css']
})
export class UpdateSponsorComponent implements OnInit {
  id!: number;
  sponsorForm!: FormGroup;
  submitted = false;
  selectedFile: File | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sponsorService: SponsorService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.createForm();
    this.getSponsor();
  }

  createForm() {
    this.sponsorForm = this.formBuilder.group({
      // Existing form controls
      nomSponsor: ['', Validators.required],
      typeSponsoring: ['', Validators.required],
      dureeSponsoring: ['', Validators.required],
      montant: ['', Validators.required],
      typeMateriel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numTel: ['', Validators.required],
      image: [''] // New form control for image
    });
  }

  get f() { return this.sponsorForm.controls; }

  getSponsor() {
    this.sponsorService.getSponsor(this.id)
      .subscribe(
        data => {
          console.log(data);
          this.sponsorForm.patchValue(data);
        },
        error => {
          console.log(error);
        });
  }

  validateField(field: string) {
    return this.submitted && this.sponsorForm.get(field)?.errors;
  }

  getErrorMessage(field: string) {
    if (this.sponsorForm.get(field)?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }
    if (field === 'email' && this.sponsorForm.get(field)?.hasError('email')) {
      return 'Email invalide';
    }
    return '';
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    this.sponsorForm.patchValue({
      image: file
    });
  }

  updateSponsor() {
    this.submitted = true;
    if (this.sponsorForm.invalid) {
      return;
    }

    this.sponsorService.updateSponsor(
      this.id,
      this.f['nomSponsor'].value,
      this.f['dureeSponsoring'].value,
      this.f['typeSponsoring'].value,
      this.f['montant'].value,
      this.f['numTel'].value,
      this.f['email'].value,
      this.f['typeMateriel'].value,
      this.selectedFile 
    ).subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        this.router.navigate(['/listSponsor']);
      },
      error => {
        console.log(error);
      });
  }
}
