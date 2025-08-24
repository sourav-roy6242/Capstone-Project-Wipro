import { Component, OnInit } from '@angular/core';
import { PolicyService, Policy } from '../../services/policy.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {
  policies: Policy[] = [];
  loading: boolean = true;
  error: string = '';

  // For filtering
  filterStatus: string = 'all';
  searchTerm: string = '';

  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.loading = true;
    this.error = '';
    
    this.policyService.getPolicies().subscribe({
      next: (data: Policy[]) => {
        this.policies = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching policies:', err);
        this.error = 'Failed to load policies. Please try again later.';
        this.loading = false;
      }
    });
  }

  // Filter policies based on status and search term
  get filteredPolicies(): Policy[] {
    return this.policies.filter(policy => {
      const matchesStatus = this.filterStatus === 'all' || policy.status === this.filterStatus.toUpperCase();
      const matchesSearch = this.searchTerm === '' || 
        policy.policy_type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (policy.notes && policy.notes.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      return matchesStatus && matchesSearch;
    });
  }

  // Get status badge class based on policy status
  getStatusClass(status: string): string {
    switch (status) {
      case 'CONFIRMED':
        return 'status-confirmed';
      case 'PENDING':
        return 'status-pending';
      case 'AGENT_APPROVED':
        return 'status-agent-approved';
      case 'REJECTED':
        return 'status-rejected';
      default:
        return 'status-unknown';
    }
  }

  // Format date for display
  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Refresh policies
  refreshPolicies(): void {
    this.loadPolicies();
  }

  // Change status filter
  changeStatusFilter(status: string): void {
    this.filterStatus = status;
  }
}