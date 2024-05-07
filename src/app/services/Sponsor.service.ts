import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { MaterielType } from '../model/MaterielType';
import { Sponsoring_type } from '../model/Sponsoring_type';
import { Sponsors } from '../model/Sponsors';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': 'http://localhost:4200'})
};
@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  private listurl ='http://localhost:9000/pi/sponsors/getAll';
  private Url='http://localhost:9000/pi/sponsors/deleteID';
  private apiUrl = "http://localhost:9000/pi";
  private updateUrl = 'http://localhost:9000/pi/sponsors/update';
  

  constructor(private http: HttpClient) { }
  
  addSponsor(
    nomSponsor: string,
    dureeSponsoring: number,
    typeSponsoring: Sponsoring_type,
    montant: number,
    numTel: string,
    email: string,
    typeMateriel: MaterielType,
    image?: File
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('nomSponsor', nomSponsor);
    formData.append('dureeSponsoring', dureeSponsoring?.toString());
    formData.append('typeSponsoring', typeSponsoring?.toString()); // Convert enum to string
    formData.append('montant', montant?.toString());
    formData.append('numTel', numTel);
    formData.append('email', email);
    formData.append('typeMateriel', typeMateriel?.toString());
    if (image) {
      formData.append('image', image, image.name);
    }
    console.log('Type Sponsoring:', typeSponsoring);
    console.log('Type Materiel:', typeMateriel);
    console.log('montant:', montant);

    return this.http.post<any>(`${this.apiUrl}/sponsors/ajout`, formData);
  }

  listSponsor() {
    
    return this.http.get(this.listurl);
   }
    deleteSponsor(id: number): Observable<void> {
    const url = `${this.Url}/${id}`;
    return this.http.delete<void>(url);
  }


   getSponsor(id: any) {
    return this.http.get('http://localhost:9000/pi/sponsors/getSponsorsId/' + id)

  }


  updateSponsor(
    id: number,
    nomSponsor: string,
    dureeSponsoring: number,
    typeSponsoring: Sponsoring_type,
    montant: number,
    numTel: string,
    email: string,
    typeMateriel: MaterielType,
    image?: File
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('nomSponsor', nomSponsor);
    formData.append('dureeSponsoring', dureeSponsoring.toString());
    formData.append('typeSponsoring', typeSponsoring.toString());
    formData.append('montant', montant.toString());
    formData.append('numTel', numTel);
    formData.append('email', email);
    formData.append('typeMateriel', typeMateriel.toString());
    if (image) {
      formData.append('image', image, image.name);
    }

    return this.http.put<any>(`${this.updateUrl}/${id}`, formData);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }



}
