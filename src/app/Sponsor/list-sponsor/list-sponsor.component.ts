import { Component } from '@angular/core';
import { SponsorService } from 'src/app/services/Sponsor.service';
import { Router } from '@angular/router';
import { Sponsor } from 'src/app/model/Sponsor';
import { jsPDF } from 'jspdf';



@Component({
  selector: 'app-list-sponsor',
  templateUrl: './list-sponsor.component.html',
  styleUrls: ['./list-sponsor.component.css']
})
export class ListSponsorComponent {
  sponsors: Sponsor[] = [];
  searchInput: string = '';
  filteredSponsors: Sponsor[] = [];
  p: number = 1;

  constructor(private service: SponsorService, private router: Router) {}

  ngOnInit() {
    this.getSponsors();
  }

  getSponsors(): void {
    this.service.listSponsor().subscribe(
      (data: any) => {
        this.sponsors = data;
        this.filteredSponsors = data; // Initialize filteredSponsors with all sponsors
        console.log('Sponsors:', data);
      },
      error => {
        console.error('Erreur lors de la récupération des sponsors', error);
      }
    );
  }

  generatePDF(): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 10;
    const sponsorCardWidth = pageWidth - 20; // Adjust as needed
  
    doc.setFontSize(18);
    doc.text('List of Sponsors', 10, yPos);
    yPos += 10;
  
    doc.setFontSize(12);
    doc.setTextColor(100); // Set text color to a gray shade
  
    this.sponsors.forEach((sponsor, index) => {
      if (index !== 0) {
        doc.addPage(); // Add a new page for every sponsor after the first one
        yPos = 10;
      }
  
      // Add sponsor image if available
      if (sponsor.image) {
        const imgData = this.getBase64ImageData(`../../assets/img/${sponsor.image}`);
        if (imgData) {
          doc.addImage(imgData, 'PNG', 10, yPos, 50, 50); // Add the image at (10, yPos) with width 50 and height 50
          yPos += 60; // Adjust the vertical position for the next content
        }
      }
  
      doc.text(`Sponsor Name: ${sponsor.nomSponsor}`, 10, yPos);
      yPos += 10;
  
      doc.text(`Sponsorship duration: ${sponsor.dureeSponsoring}`, 10, yPos);
      yPos += 10;
  
      doc.text(`Sponsor Type: ${sponsor.typeSponsoring ?? 'Unknown'}`, 10, yPos);
      yPos += 10;
  
      doc.text(`Email Address: ${sponsor.email}`, 10, yPos);
      yPos += 10;
  
      doc.text(`Phone Number: ${sponsor.numTel}`, 10, yPos);
      yPos += 10;
  
      yPos += 10; // Add spacing between sponsors
    });
  
    doc.save('sponsors.pdf');
  }
  
  // Helper function to get base64 image data
  getBase64ImageData(imagePath: string): string | null {
    const img = new Image();
    img.src = imagePath;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return null;
    }
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/png');
  }


  deleteSponsor(id: number): void {
    this.service.deleteSponsor(id).subscribe(() => {
      this.sponsors = this.sponsors.filter(sponsor => sponsor.id !== id);
      this.filteredSponsors = this.filteredSponsors.filter(sponsor => sponsor.id !== id);
    });
  }

  modifierSponsor(id: any) {
    this.router.navigate(['modifierSponsor' + '/' + id]);
  }

  openResponseForm(sponsor: Sponsor): void {
    this.router.navigate(['response', sponsor.id], { state: { sponsorDetails: sponsor } });
  }

  navigateToAddSponsor() {
    this.router.navigate(['/addsponsor']);
  }



filterSponsors(): void {
  if (!this.searchInput) {
    this.filteredSponsors = this.sponsors; 
  } else {
    this.filteredSponsors = this.sponsors.filter(sponsor =>
      sponsor.nomSponsor && sponsor.nomSponsor.toLowerCase().includes(this.searchInput.toLowerCase())
    );
  }
}

}
