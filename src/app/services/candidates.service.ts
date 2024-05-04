import { Injectable } from '@angular/core';
import { Recrutement } from '../model/recrutement';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RecrutementID } from '../model/RecrutementID';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': 'http://localhost:4200'})
};
@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  private modifierurl = 'http://localhost:9000/pi/recrutement/updateRecrutement';
  private baseUrl  = '  http://localhost:9000/pi/recrutement/getAll'; 
  constructor(public http: HttpClient){};
  getAll(): Observable<Recrutement[]>{
     return this.http.get<Recrutement[]>(this.baseUrl);
}
modifierCandidate(candidate: Recrutement) {
  // const Url =`${this.modifierurl}`;
  // return this.http.put<Recrutement>(Url, Recrutement);
  return this.http.put('http://localhost:9000/pi/recrutement/updateRecrutement',candidate)
 }
getRecrutementId(id: RecrutementID): Observable<Recrutement> {
  const { idClub, idUtilisateur } = id; // Destructure properties
  const url = `http://localhost:9000/pi/recrutement/getRecrutementId/${idClub}/${idUtilisateur}`;
  return this.http.get<Recrutement>(url);
}
deleteRecrutementById(id: RecrutementID){
  const { idClub, idUtilisateur } = id; // Destructure properties
  const url = `http://localhost:9000/pi/recrutement/deleteID/${idClub}/${idUtilisateur}`;
  return this.http.delete(url)

 // return this.http.delete('http://localhost:9000/pi/recrutement/deleteID/'+id)
 // return this.http.delete('http://localhost:3000/products/'+id)

}
}
