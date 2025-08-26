// import { Component, OnInit } from '@angular/core';
// import { ClaimService, Claim } from '../../services/claim.service';

// @Component({
//   selector: 'app-claim-page',
//   templateUrl: './claim-page.component.html',
//   styleUrls: ['./claim-page.component.css']
// })
// export class ClaimPageComponent implements OnInit {
//   claims: Claim[] = [];

//   constructor(private claimService: ClaimService) {}

//   ngOnInit(): void {
//     this.loadPendingClaims();
//   }

//   // Load all pending claims
//   loadPendingClaims(): void {
//     this.claimService.listClaims().subscribe(
//       (data: Claim[]) => {
//         this.claims = data.filter(c => c.status === 'Pending');
//       },
//       (err: any) => {
//         console.error('Error fetching claims:', err);
//       }
//     );
//   }

//   // Approve claim
//   approveClaim(claimId: number): void {
//     this.claimService.agentApprove(claimId).subscribe(
//       (res: any) => {
//         alert(res.message);
//         this.loadPendingClaims(); // Refresh list
//       },
//       (err: any) => {
//         alert(err.error?.message || 'Error approving claim');
//       }
//     );
//   }
// }




import { Component, OnInit } from '@angular/core';
import { ClaimService, Claim } from '../../services/claim.service';

@Component({
  selector: 'app-claim-page',
  templateUrl: './claim-page.component.html',
  styleUrls: ['./claim-page.component.css']
})
export class ClaimPageComponent implements OnInit {
  claims: Claim[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private claimService: ClaimService) {}

  ngOnInit(): void {
    this.loadPendingClaims();
  }

  // Load all pending claims
  loadPendingClaims(): void {
    this.loading = true;
    this.error = '';
    
    this.claimService.listClaims().subscribe(
      (data: Claim[]) => {
        this.claims = data.filter(c => c.status === 'Pending');
        this.loading = false;
      },
      (err: any) => {
        console.error('Error fetching claims:', err);
        this.error = 'Failed to load claims. Please try again later.';
        this.loading = false;
      }
    );
  }

  // Get count of claims by status
  getStatusCount(status: string): number {
    return this.claims.filter(claim => claim.status === status).length;
  }

  // Safe status conversion for CSS classes
  getStatusClass(status: string | undefined): string {
    if (!status) return 'status-unknown';
    return `status-${status.toLowerCase()}`;
  }

  // Approve claim
  approveClaim(claimId: number): void {
    this.claimService.agentApprove(claimId).subscribe(
      (res: any) => {
        alert(res.message);
        this.loadPendingClaims(); // Refresh list
      },
      (err: any) => {
        alert(err.error?.message || 'Error approving claim');
      }
    );
  }

  // Reject claim
  rejectClaim(claimId: number): void {
    // You'll need to implement this method in your ClaimService
    // For now, I'll show a placeholder implementation
    alert('Reject functionality would be implemented here');
    console.log('Would reject claim:', claimId);
  }
}