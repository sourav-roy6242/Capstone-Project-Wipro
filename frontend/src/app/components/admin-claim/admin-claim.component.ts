import { Component, OnInit } from '@angular/core';
import { ClaimService, Claim } from '../../services/claim.service';

@Component({
  selector: 'app-admin-claim',
  templateUrl: './admin-claim.component.html',
  styleUrls: ['./admin-claim.component.css']
})
export class AdminClaimComponent implements OnInit {
  claims: Claim[] = [];

  constructor(private claimService: ClaimService) {}

  ngOnInit(): void {
    this.loadAgentApprovedClaims();
  }

  loadAgentApprovedClaims(): void {
    this.claimService.listClaims().subscribe(
      (data: Claim[]) => {
        this.claims = data.filter(c => c.status === 'Approved by Agent');
      },
      (err: any) => console.error('Error fetching claims:', err)
    );
  }

  approveClaim(claimId: number): void {
    this.claimService.adminApprove(claimId).subscribe(
      (res: any) => {
        alert(res.message);
        this.loadAgentApprovedClaims();
      },
      (err: any) => alert(err.error?.message || 'Error approving claim')
    );
  }
}
