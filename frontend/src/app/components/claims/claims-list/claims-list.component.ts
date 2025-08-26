// // import { Component, OnInit } from '@angular/core';
// // import { ClaimService, Claim } from '../../../services/claim.service';

// // @Component({
// //   selector: 'app-claims-list',
// //   templateUrl: './claims-list.component.html',
// //   styleUrls: ['./claims-list.component.css']
// // })
// // export class ClaimsListComponent implements OnInit {

// //   claims: Claim[] = [];

// //   constructor(private claimService: ClaimService) {}

// //   ngOnInit(): void {
// //     this.loadClaims();
// //   }

// //   loadClaims() {
// //     this.claimService.getClaims().subscribe({
// //       next: (res) => this.claims = res,
// //       error: (err) => console.error(err)
// //     });
// //   }
// // }




// import { Component, OnInit } from '@angular/core';
// import { ClaimService, Claim } from '../../../services/claim.service';

// @Component({
//   selector: 'app-claims-list',
//   templateUrl: './claims-list.component.html',
//   styleUrls: ['./claims-list.component.css']
// })
// export class ClaimsListComponent implements OnInit {

//   claims: Claim[] = [];

//   constructor(private claimService: ClaimService) {}

//   ngOnInit(): void {
//     this.loadClaims();
//   }

//   loadClaims() {
//     this.claimService.getClaims().subscribe({
//       next: (res) => this.claims = res,
//       error: (err) => console.error(err)
//     });
//   }

//   // Safe method to get property values without TypeScript errors
//   getProperty(claim: any, property: string): any {
//     if (!claim || !property) return null;
//     return claim[property] !== undefined ? claim[property] : null;
//   }

//   // Helper method to get all properties of an object (excluding id and status)
//   getOtherProperties(claim: any): string[] {
//     if (!claim) return [];
//     return Object.keys(claim).filter(key => 
//       key !== 'id' && 
//       key !== 'status' && 
//       claim[key] !== null && 
//       claim[key] !== undefined
//     );
//   }

//   // Helper method to format property names for display
//   formatLabel(key: string): string {
//     return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
//   }
// }



import { Component, OnInit } from '@angular/core';
import { ClaimService, Claim } from '../../../services/claim.service';

@Component({
  selector: 'app-claims-list',
  templateUrl: './claims-list.component.html',
  styleUrls: ['./claims-list.component.css']
})
export class ClaimsListComponent implements OnInit {
  claims: Claim[] = [];

  constructor(private claimService: ClaimService) {}

  ngOnInit(): void {
    this.loadClaims();
  }

  loadClaims(): void {
    // ✅ Use listClaims() instead of getClaims()
    this.claimService.listClaims().subscribe(
      (res: Claim[]) => {
        this.claims = res;
      },
      (err: any) => {
        console.error('Error fetching claims:', err);
      }
    );
  }

  // Safe method to get property values without TypeScript errors
  getProperty(claim: any, property: string): any {
    if (!claim || !property) return null;
    return claim[property] !== undefined ? claim[property] : null;
  }

  // Helper method to get all properties of an object (excluding id and status)
  getOtherProperties(claim: any): string[] {
    if (!claim) return [];
    return Object.keys(claim).filter(
      key => key !== 'id' && key !== 'status' && claim[key] !== null && claim[key] !== undefined
    );
  }

  // Helper method to format property names for display
  formatLabel(key: string): string {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
}
