// import { Component, OnInit } from '@angular/core';
// import { ClaimService, Claim } from '../../services/claim.service';

// @Component({
//   selector: 'app-admin-claim',
//   templateUrl: './admin-claim.component.html',
//   styleUrls: ['./admin-claim.component.css']
// })
// export class AdminClaimComponent implements OnInit {
//   claims: Claim[] = [];
//   filteredClaims: Claim[] = [];
//   isLoading = true;
//   errorMessage = '';
//   selectedClaim: Claim | null = null;
//   today: Date = new Date();
//   searchQuery: string = '';

//   constructor(private claimService: ClaimService) {}

//   ngOnInit(): void {
//     this.loadAgentApprovedClaims();
//   }

//   loadAgentApprovedClaims(): void {
//     this.isLoading = true;
//     this.errorMessage = '';
    
//     this.claimService.listClaims().subscribe(
//       (data: Claim[]) => {
//         this.claims = data.filter(c => c.status === 'Approved by Agent');
//         this.filteredClaims = [...this.claims];
//         this.isLoading = false;
//       },
//       (err: any) => {
//         console.error('Error fetching claims:', err);
//         this.errorMessage = 'Failed to load claims. Please try again later.';
//         this.isLoading = false;
//       }
//     );
//   }

//   filterClaims(event: any): void {
//     this.searchQuery = event.target.value.toLowerCase();
//     if (!this.searchQuery) {
//       this.filteredClaims = [...this.claims];
//       return;
//     }
    
//     this.filteredClaims = this.claims.filter(claim => 
//       claim.user_name?.toLowerCase().includes(this.searchQuery) ||
//       claim.policy_id?.toLowerCase().includes(this.searchQuery) ||
//       claim.policy_type?.toLowerCase().includes(this.searchQuery) ||
//       claim.description?.toLowerCase().includes(this.searchQuery) ||
//       claim.amount?.toString().includes(this.searchQuery) ||
//       claim.status?.toLowerCase().includes(this.searchQuery)
//     );
//   }

//   selectClaim(claim: Claim): void {
//     this.selectedClaim = claim;
//   }

//   approveClaim(claimId: number): void {
//     this.claimService.adminApprove(claimId).subscribe(
//       (res: any) => {
//         alert(res.message);
//         this.loadAgentApprovedClaims();
//         this.selectedClaim = null;
//       },
//       (err: any) => alert(err.error?.message || 'Error approving claim')
//     );
//   }

//   rejectClaim(claimId: number): void {
//     if (confirm('Are you sure you want to reject this claim?')) {
//       // For demo purposes, we'll simulate a reject API call
//       alert('Claim rejected successfully!');
//       this.claims = this.claims.filter(claim => claim.id !== claimId);
//       this.filteredClaims = this.filteredClaims.filter(claim => claim.id !== claimId);
//       this.selectedClaim = null;
      
//       // In a real application, you would use:
//       // this.claimService.adminReject(claimId).subscribe(
//       //   (res: any) => {
//       //     alert(res.message);
//       //     this.loadAgentApprovedClaims();
//       //     this.selectedClaim = null;
//       //   },
//       //   (err: any) => alert(err.error?.message || 'Error rejecting claim')
//       // );
//     }
//   }

//   // Helper method to safely get status class
//   getStatusClass(status: string | undefined): string {
//     if (!status) return 'status-unknown';
    
//     const statusLower = status.toLowerCase();
//     if (statusLower.includes('pending')) return 'status-pending';
//     if (statusLower.includes('approve')) return 'status-approved';
//     if (statusLower.includes('reject')) return 'status-rejected';
    
//     return 'status-unknown';
//   }

//   // Calculate total amount of all claims
//   getTotalAmount(): number {
//     return this.claims.reduce((total, claim) => {
//       const amount = claim.amount ? parseFloat(claim.amount.toString()) : 0;
//       return total + amount;
//     }, 0);
//   }

//   // Safe method to get user initial
//   getUserInitial(userName: string | undefined): string {
//     return userName && userName.length > 0 ? userName.charAt(0) : 'U';
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

  // Track approved claims in memory since we don't have approval_date field
  approvedClaimsToday: number = 0;

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
        
        // Calculate approved today count after loading claims
        this.calculateApprovedToday();
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
        // Increment the approved today counter
        this.approvedClaimsToday++;
        
        // Store in localStorage to persist across page refreshes
        this.updateStoredApprovals(claimId);
        
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

  // Calculate total amount of all APPROVED claims
  getTotalAmount(): number {
    return this.claims.reduce((total, claim) => {
      // Only include approved claims in the total
      if (claim.status === 'Approved by Agent') {
        const amount = claim.amount ? parseFloat(claim.amount.toString()) : 0;
        return total + amount;
      }
      return total;
    }, 0);
  }

  // Safe method to get user initial
  getUserInitial(userName: string | undefined): string {
    return userName && userName.length > 0 ? userName.charAt(0) : 'U';
  }

  // Calculate approved today count
  calculateApprovedToday(): void {
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    // Check if we have approval data in storage
    const approvalData = localStorage.getItem('claimApprovals');
    
    if (approvalData) {
      const approvals = JSON.parse(approvalData);
      
      // Filter approvals that happened today
      const todayApprovals = approvals.filter((approval: any) => {
        const approvalDate = new Date(approval.timestamp).toISOString().split('T')[0];
        return approvalDate === todayString;
      });
      
      this.approvedClaimsToday = todayApprovals.length;
    } else {
      this.approvedClaimsToday = 0;
    }
  }

  // Update stored approvals in localStorage
  updateStoredApprovals(claimId: number): void {
    const approvalData = localStorage.getItem('claimApprovals') || '[]';
    const approvals = JSON.parse(approvalData);
    
    // Add new approval with current timestamp
    approvals.push({
      claimId: claimId,
      timestamp: new Date().toISOString()
    });
    
    // Store back in localStorage
    localStorage.setItem('claimApprovals', JSON.stringify(approvals));
    
    // Recalculate today's count
    this.calculateApprovedToday();
  }

  // Getter for approved today count
  getApprovedTodayCount(): number {
    return this.approvedClaimsToday;
  }
}