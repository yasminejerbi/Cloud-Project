export enum Sponsoring_type {
    financier,
    materiel
}

export enum MaterielType {
    Laptop,
    Data_show,
    Tables_chairs,
    no_material
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
        public typeMateriel?: MaterielType,
        public image?:String,
   




    ) {}
    }