export enum Sponsoring_type {
    negatif,
    positif,
    neutre
    // Ajoutez plus de catégories ici si nécessaire
}
export class Sponsor {
    constructor(

        public id?: number,
       
        public nomSponsor?: string,
       
        public typeSponsoring?: Sponsoring_type,
    
   
        public  dureeSponsoring?:number,
        public  montant?:number,
        public  email?:String,
        public  numTel?:String,
   




    ) {}
    }