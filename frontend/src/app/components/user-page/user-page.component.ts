// import { Component, OnInit } from '@angular/core';
// import { PolicyService , Policy } from '../../services/policy.service';
// import { AuthService } from '../../services/auth.service';
// import { map } from 'rxjs/operators';

// @Component({
//   selector: 'app-user-policies',
//   templateUrl: './user-policies.component.html',
//   styleUrls: ['./user-policies.component.css']
// })
// export class UserPoliciesComponent implements OnInit {
//   userPolicies: Policy[] = [];
//   isLoading: boolean = true;
//   currentUser: any;

//   constructor(
//     private policyService: PolicyService,
//     private authService: AuthService
//   ) { }

//   ngOnInit(): void {
//     this.loadUserPolicies();
//   }

//   loadUserPolicies(): void {
//     this.isLoading = true;
    
//     // Get current user from auth service
//     this.currentUser = this.authService.currentUserValue;
    
//     if (this.currentUser && this.currentUser.id) {
//       this.policyService.getPolicies().pipe(
//         map(policies => policies.filter(p => p.userId === this.currentUser.id))
//       ).subscribe(
//         (policies: Policy[]) => {
//           this.userPolicies = policies;
//           this.isLoading = false;
//         },
//         (error) => {
//           console.error('Error loading user policies:', error);
//           this.isLoading = false;
//         }
//       );
//     } else {
//       console.error('No user logged in');
//       this.isLoading = false;
//     }
//   }

//   getStatusClass(status: string): string {
//     if (!status) return '';
//     return `status-${status.toLowerCase()}`;
//   }

//   formatStatus(status: string): string {
//     if (!status) return '';
//     return status.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
//   }

//   viewPolicyDetails(policyId: string): void {
//     // Navigate to policy details page
//     console.log('View policy details:', policyId);
//   }

//   makeClaim(policyId: string): void {
//     // Navigate to claims page
//     console.log('Make claim for policy:', policyId);
//   }
// }