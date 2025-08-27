
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PolicyService, Policy } from '../../services/policy.service';

interface UserPolicy extends Policy {
  name: string;
  coverageAmount: number;
  premiumDue: number;
  totalPremium: number;
  nextPremiumDate: Date;
  paymentStatus: 'paid' | 'due' | 'overdue';
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  userPolicies: UserPolicy[] = [];
  isLoading: boolean = true;
  activeTab: string = 'policies';
  totalPremiumDue: number = 0;
  activePoliciesCount: number = 0;
  pendingPoliciesCount: number = 0;

  // Computed properties for template
  get pendingPolicies() {
    return this.userPolicies.filter(p => p.status === 'pending');
  }

  get activePolicies() {
    return this.userPolicies.filter(p => p.status === 'active');
  }

  get rejectedPolicies() {
    return this.userPolicies.filter(p => p.status === 'rejected');
  }

  // Policy type mappings
  private policyTypeDetails = {
    auto: { name: 'Comprehensive Auto Insurance', coverage: 25000, premium: 120 },
    health: { name: 'Family Health Plan', coverage: 50000, premium: 200 },
    home: { name: 'Home Protection Plan', coverage: 350000, premium: 150 },
    life: { name: 'Life Security Plan', coverage: 1000000, premium: 300 }
  };

  constructor(
    private authService: AuthService,
    private policyService: PolicyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadUserPolicies();
  }

  loadUserData(): void {
    this.user = this.authService.getUser();
    if (!this.user) {
      this.router.navigate(['/login-user']);
    }
  }

  loadUserPolicies(): void {
    this.isLoading = true;
    
    // Use getPoliciesByUser if it exists, otherwise use getPolicies and filter
    if (this.policyService.getPoliciesByUser) {
      this.policyService.getPoliciesByUser(this.user.id).subscribe(
        (policies: Policy[]) => {
          this.handlePoliciesResponse(policies);
        },
        (error: any) => {
          console.error('Error loading policies:', error);
          this.isLoading = false;
        }
      );
    } else {
      // Fallback: get all policies and filter by user
      this.policyService.getPolicies().subscribe(
        (policies: Policy[]) => {
          const userPolicies = policies.filter(p => p.user_id === this.user.id);
          this.handlePoliciesResponse(userPolicies);
        },
        (error: any) => {
          console.error('Error loading policies:', error);
          this.isLoading = false;
        }
      );
    }
  }

  private handlePoliciesResponse(policies: Policy[]): void {
    this.userPolicies = this.transformPolicies(policies);
    this.calculateSummary();
    this.isLoading = false;
  }

  private transformPolicies(policies: Policy[]): UserPolicy[] {
    return policies.map(policy => {
      const typeDetails = this.policyTypeDetails[policy.policy_type as keyof typeof this.policyTypeDetails] || 
                         { name: `${policy.policy_type} Policy`, coverage: 10000, premium: 100 };
      
      const createdDate = new Date(policy.created_at);
      const nextPremiumDate = new Date(createdDate);
      nextPremiumDate.setMonth(nextPremiumDate.getMonth() + 1);
      
      // Determine payment status
      let paymentStatus: 'paid' | 'due' | 'overdue' = 'due';
      if (policy.status === 'active') {
        const today = new Date();
        const daysUntilDue = Math.ceil((nextPremiumDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        paymentStatus = daysUntilDue < 0 ? 'overdue' : 'due';
        
        // For demo purposes, mark some as paid
        if (Math.random() > 0.5) {
          paymentStatus = 'paid';
        }
      }

      return {
        ...policy,
        name: typeDetails.name,
        coverageAmount: typeDetails.coverage,
        premium: typeDetails.premium,
        premiumDue: paymentStatus !== 'paid' ? typeDetails.premium : 0,
        totalPremium: typeDetails.premium * 12,
        nextPremiumDate: nextPremiumDate,
        paymentStatus: paymentStatus
      };
    });
  }

  private calculateSummary(): void {
    this.totalPremiumDue = this.userPolicies
      .filter(policy => (policy.paymentStatus === 'due' || policy.paymentStatus === 'overdue') && policy.status === 'active')
      .reduce((sum, policy) => sum + policy.premiumDue, 0);

    this.activePoliciesCount = this.userPolicies
      .filter(policy => policy.status === 'active').length;

    this.pendingPoliciesCount = this.userPolicies
      .filter(policy => policy.status === 'pending').length;
  }

  getPolicyIcon(policyType: string): string {
    switch (policyType.toLowerCase()) {
      case 'auto': return 'fa-car';
      case 'health': return 'fa-heartbeat';
      case 'home': return 'fa-home';
      case 'life': return 'fa-heart';
      default: return 'fa-file-contract';
    }
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }

  getPaymentStatusClass(status: string): string {
    return `payment-${status.toLowerCase()}`;
  }

  viewPolicyDetails(policyId: number): void {
    console.log('View policy details:', policyId);
    // this.router.navigate(['/policy-details', policyId]);
  }

  makeClaim(policyId: number): void {
    console.log('Make claim for policy:', policyId);
    // this.router.navigate(['/make-claim', policyId]);
  }

  payPremium(policy: UserPolicy): void {
    if ((policy.paymentStatus === 'due' || policy.paymentStatus === 'overdue') && policy.status === 'active') {
      // Simulate payment processing
      policy.paymentStatus = 'paid';
      policy.premiumDue = 0;
      
      // Recalculate summary
      this.calculateSummary();
      
      alert(`Premium payment successful for ${this.getPolicyTypeName(policy.policy_type)}`);
    }
  }

  getDaysUntilDue(nextPremiumDate: Date): number {
    const today = new Date();
    const dueDate = new Date(nextPremiumDate);
    const diffTime = dueDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getApprovalStatus(policy: UserPolicy): string {
    if (policy.status === 'rejected') return 'Policy Rejected';
    if (!policy.agent_approved_at) return 'Waiting for agent approval';
    if (!policy.admin_approved_at) return 'Waiting for admin approval';
    return 'Approved';
  }

  getPolicyTypeName(policyType: string): string {
    return this.policyTypeDetails[policyType as keyof typeof this.policyTypeDetails]?.name || policyType;
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'Not approved';
    return new Date(dateString).toLocaleDateString();
  }

  canMakeClaim(policy: UserPolicy): boolean {
    return policy.status === 'active' && policy.paymentStatus === 'paid';
  }

  canPayPremium(policy: UserPolicy): boolean {
    return policy.status === 'active' && policy.paymentStatus !== 'paid';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
  }
}



