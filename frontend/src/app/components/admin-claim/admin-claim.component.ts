// import { Component, OnInit } from '@angular/core';
// import { ClaimService, Claim } from '../../services/claim.service';

// @Component({
//   selector: 'app-admin-claim',
//   templateUrl: './admin-claim.component.html',
//   styleUrls: ['./admin-claim.component.css']
// })
// export class AdminClaimComponent implements OnInit {
//   claims: Claim[] = [];

//   constructor(private claimService: ClaimService) {}

//   ngOnInit(): void {
//     this.loadAgentApprovedClaims();
//   }

//   loadAgentApprovedClaims(): void {
//     this.claimService.listClaims().subscribe(
//       (data: Claim[]) => {
//         this.claims = data.filter(c => c.status === 'Approved by Agent');
//       },
//       (err: any) => console.error('Error fetching claims:', err)
//     );
//   }

//   approveClaim(claimId: number): void {
//     this.claimService.adminApprove(claimId).subscribe(
//       (res: any) => {
//         alert(res.message);
//         this.loadAgentApprovedClaims();
//       },
//       (err: any) => alert(err.error?.message || 'Error approving claim')
//     );
//   }
// }




import { Component, OnInit } from '@angular/core';
import { ClaimService, Claim } from '../../services/claim.service';

@Component({
  selector: 'app-admin-claim',
  templateUrl: './admin-claim.component.html',
  styleUrls: ['./admin-claim.component.css']
})
export class AdminClaimComponent implements OnInit {
  claims: Claim[] = [];
  filteredClaims: Claim[] = [];
  isLoading = true;
  errorMessage = '';
  selectedClaim: Claim | null = null;
  today: Date = new Date();
  searchQuery: string = '';

  constructor(private claimService: ClaimService) {}

  ngOnInit(): void {
    this.loadAgentApprovedClaims();
  }

  loadAgentApprovedClaims(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.claimService.listClaims().subscribe(
      (data: Claim[]) => {
        this.claims = data.filter(c => c.status === 'Approved by Agent');
        this.filteredClaims = [...this.claims];
        this.isLoading = false;
      },
      (err: any) => {
        console.error('Error fetching claims:', err);
        this.errorMessage = 'Failed to load claims. Please try again later.';
        this.isLoading = false;
      }
    );
  }

  filterClaims(event: any): void {
    this.searchQuery = event.target.value.toLowerCase();
    if (!this.searchQuery) {
      this.filteredClaims = [...this.claims];
      return;
    }
    
    this.filteredClaims = this.claims.filter(claim => 
      claim.user_name?.toLowerCase().includes(this.searchQuery) ||
      claim.policy_id?.toLowerCase().includes(this.searchQuery) ||
      claim.policy_type?.toLowerCase().includes(this.searchQuery) ||
      claim.description?.toLowerCase().includes(this.searchQuery) ||
      claim.amount?.toString().includes(this.searchQuery) ||
      claim.status?.toLowerCase().includes(this.searchQuery)
    );
  }

  selectClaim(claim: Claim): void {
    this.selectedClaim = claim;
  }

  approveClaim(claimId: number): void {
    this.claimService.adminApprove(claimId).subscribe(
      (res: any) => {
        alert(res.message);
        this.loadAgentApprovedClaims();
        this.selectedClaim = null;
      },
      (err: any) => alert(err.error?.message || 'Error approving claim')
    );
  }

  rejectClaim(claimId: number): void {
    if (confirm('Are you sure you want to reject this claim?')) {
      // For demo purposes, we'll simulate a reject API call
      alert('Claim rejected successfully!');
      this.claims = this.claims.filter(claim => claim.id !== claimId);
      this.filteredClaims = this.filteredClaims.filter(claim => claim.id !== claimId);
      this.selectedClaim = null;
      
      // In a real application, you would use:
      // this.claimService.adminReject(claimId).subscribe(
      //   (res: any) => {
      //     alert(res.message);
      //     this.loadAgentApprovedClaims();
      //     this.selectedClaim = null;
      //   },
      //   (err: any) => alert(err.error?.message || 'Error rejecting claim')
      // );
    }
  }

  // Helper method to safely get status class
  getStatusClass(status: string | undefined): string {
    if (!status) return 'status-unknown';
    
    const statusLower = status.toLowerCase();
    if (statusLower.includes('pending')) return 'status-pending';
    if (statusLower.includes('approve')) return 'status-approved';
    if (statusLower.includes('reject')) return 'status-rejected';
    
    return 'status-unknown';
  }

  // Calculate total amount of all claims
  getTotalAmount(): number {
    return this.claims.reduce((total, claim) => {
      const amount = claim.amount ? parseFloat(claim.amount.toString()) : 0;
      return total + amount;
    }, 0);
  }

  // Safe method to get user initial
  getUserInitial(userName: string | undefined): string {
    return userName && userName.length > 0 ? userName.charAt(0) : 'U';
  }
}