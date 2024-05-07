export enum Sponsoring_type {
    financier = 'financier',
    materiel = 'materiel'
}


export enum MaterielType {
    Laptop = 'Laptop',
    Data_show = 'Data_show',
    Tables_chairs = 'Tables_chairs',
    no_material = 'no_material',
}
export class Sponsors {
    id!: number;
    nomSponsor!: string;
    dureeSponsoring!: number;
    typeSponsoring!: Sponsoring_type;
    montant!: number;
    numTel!: string;
    email!: string;
    typeMateriel!: MaterielType;
    image!: string; // Assuming image URL is returned from backend
  }
  