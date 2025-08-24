// import { Component, OnInit } from '@angular/core';
// import { PolicyService, Policy } from '../../services/policy.service';

// @Component({
//   selector: 'app-agent-page',
//   templateUrl: './agent-page.component.html',
//   styleUrls: ['./agent-page.component.css']
// })
// export class AgentPageComponent implements OnInit {
//   policies: Policy[] = [];
//   filteredPolicies: Policy[] = [];
//   loading: boolean = true;
//   error: string = '';
  
//   // Filters
//   statusFilter: string = 'all';
//   searchTerm: string = '';
  
//   // Selected policy for actions
//   selectedPolicy: Policy | null = null;
//   actionNotes: string = '';
  
//   // Stats
//   stats = {
//     total: 0,
//     pending: 0,
//     approved: 0,
//     rejected: 0,
//     confirmed: 0
//   };

//   constructor(private policyService: PolicyService) {}

//   ngOnInit(): void {
//     this.loadPolicies();
//   }

//   loadPolicies(): void {
//     this.loading = true;
//     this.error = '';
    
//     this.policyService.getPolicies().subscribe({
//       next: (data: Policy[]) => {
//         this.policies = data;
//         this.applyFilters();
//         this.calculateStats();
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('Error fetching policies:', err);
//         this.error = 'Failed to load policies. Please try again later.';
//         this.loading = false;
//       }
//     });
//   }

//   applyFilters(): void {
//     this.filteredPolicies = this.policies.filter(policy => {
//       const matchesStatus = this.statusFilter === 'all' || policy.status === this.statusFilter.toUpperCase();
//       const matchesSearch = this.searchTerm === '' || 
//         policy.policy_type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         (policy.notes && policy.notes.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
//         policy.user_id.toString().includes(this.searchTerm);
      
//       return matchesStatus && matchesSearch;
//     });
//   }

//   calculateStats(): void {
//     this.stats = {
//       total: this.policies.length,
//       pending: this.policies.filter(p => p.status === 'PENDING').length,
//       approved: this.policies.filter(p => p.status === 'AGENT_APPROVED').length,
//       rejected: this.policies.filter(p => p.status === 'REJECTED').length,
//       confirmed: this.policies.filter(p => p.status === 'CONFIRMED').length
//     };
//   }

//   onFilterChange(): void {
//     this.applyFilters();
//   }

//   onSearchChange(): void {
//     this.applyFilters();
//   }

//   selectPolicy(policy: Policy): void {
//     this.selectedPolicy = policy;
//     this.actionNotes = policy.notes || '';
//   }

//   clearSelection(): void {
//     this.selectedPolicy = null;
//     this.actionNotes = '';
//   }

//   approvePolicy(): void {
//     if (!this.selectedPolicy) return;

//     const agentId = 123; // This would come from authentication service
    
//     this.policyService.agentApprove(this.selectedPolicy.id, {
//       agent_id: agentId,
//       notes: this.actionNotes
//     }).subscribe({
//       next: (updatedPolicy: Policy) => {
//         // Update the policy in the list
//         const index = this.policies.findIndex(p => p.id === updatedPolicy.id);
//         if (index !== -1) {
//           this.policies[index] = updatedPolicy;
//         }
        
//         this.applyFilters();
//         this.calculateStats();
//         this.clearSelection();
//         alert('Policy approved successfully!');
//       },
//       error: (err) => {
//         console.error('Error approving policy:', err);
//         alert('Failed to approve policy. Please try again.');
//       }
//     });
//   }

//   rejectPolicy(): void {
//     if (!this.selectedPolicy) return;

//     this.policyService.rejectPolicy(this.selectedPolicy.id, {
//       notes: this.actionNotes || 'Rejected by agent'
//     }).subscribe({
//       next: (updatedPolicy: Policy) => {
//         // Update the policy in the list
//         const index = this.policies.findIndex(p => p.id === updatedPolicy.id);
//         if (index !== -1) {
//           this.policies[index] = updatedPolicy;
//         }
        
//         this.applyFilters();
//         this.calculateStats();
//         this.clearSelection();
//         alert('Policy rejected successfully!');
//       },
//       error: (err) => {
//         console.error('Error rejecting policy:', err);
//         alert('Failed to reject policy. Please try again.');
//       }
//     });
//   }

//   updateNotes(): void {
//     if (!this.selectedPolicy) return;

//     this.policyService.updatePolicyNotes(this.selectedPolicy.id, this.actionNotes)
//       .subscribe({
//         next: (updatedPolicy: Policy) => {
//           // Update the policy in the list
//           const index = this.policies.findIndex(p => p.id === updatedPolicy.id);
//           if (index !== -1) {
//             this.policies[index] = updatedPolicy;
//           }
          
//           alert('Notes updated successfully!');
//         },
//         error: (err) => {
//           console.error('Error updating notes:', err);
//           alert('Failed to update notes. Please try again.');
//         }
//       });
//   }

//   getStatusClass(status: string): string {
//     switch (status) {
//       case 'PENDING': return 'status-pending';
//       case 'AGENT_APPROVED': return 'status-approved';
//       case 'CONFIRMED': return 'status-confirmed';
//       case 'REJECTED': return 'status-rejected';
//       default: return 'status-unknown';
//     }
//   }

//   formatDate(dateString: string): string {
//     if (!dateString) return 'N/A';
    
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   }

//   canApprove(policy: Policy): boolean {
//     return policy.status === 'PENDING';
//   }

//   canReject(policy: Policy): boolean {
//     return policy.status === 'PENDING' || policy.status === 'AGENT_APPROVED';
//   }

//   refreshPolicies(): void {
//     this.loadPolicies();
//     this.clearSelection();
//   }
// }








import { Component, OnInit } from '@angular/core';
import { PolicyService, Policy } from '../../services/policy.service';

@Component({
  selector: 'app-agent-page',
  templateUrl: './agent-page.component.html',
  styleUrls: ['./agent-page.component.css']
})
export class AgentPageComponent implements OnInit {
  policies: Policy[] = [];
  filteredPolicies: Policy[] = [];
  loading: boolean = true;
  error: string = '';
  
  // Filters
  statusFilter: string = 'all';
  searchTerm: string = '';
  
  // Selected policy for actions
  selectedPolicy: Policy | null = null;
  actionNotes: string = '';
  
  // Stats
  stats = {
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    confirmed: 0
  };

  // Chart data
  chartData: any = null;

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
        this.applyFilters();
        this.calculateStats();
        this.prepareChartData();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching policies:', err);
        this.error = 'Failed to load policies. Please try again later.';
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredPolicies = this.policies.filter(policy => {
      const matchesStatus = this.statusFilter === 'all' || policy.status === this.statusFilter.toUpperCase();
      const matchesSearch = this.searchTerm === '' || 
        policy.policy_type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (policy.notes && policy.notes.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        policy.user_id.toString().includes(this.searchTerm);
      
      return matchesStatus && matchesSearch;
    });
  }

  calculateStats(): void {
    this.stats = {
      total: this.policies.length,
      pending: this.policies.filter(p => p.status === 'PENDING').length,
      approved: this.policies.filter(p => p.status === 'AGENT_APPROVED').length,
      rejected: this.policies.filter(p => p.status === 'REJECTED').length,
      confirmed: this.policies.filter(p => p.status === 'CONFIRMED').length
    };
  }

  prepareChartData(): void {
    this.chartData = {
      labels: ['Pending', 'Approved', 'Confirmed', 'Rejected'],
      datasets: [
        {
          data: [this.stats.pending, this.stats.approved, this.stats.confirmed, this.stats.rejected],
          backgroundColor: [
            'rgba(255, 193, 7, 0.8)',
            'rgba(40, 167, 69, 0.8)',
            'rgba(23, 162, 184, 0.8)',
            'rgba(220, 53, 69, 0.8)'
          ],
          borderColor: [
            'rgb(255, 193, 7)',
            'rgb(40, 167, 69)',
            'rgb(23, 162, 184)',
            'rgb(220, 53, 69)'
          ],
          borderWidth: 1
        }
      ]
    };
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  selectPolicy(policy: Policy): void {
    this.selectedPolicy = policy;
    this.actionNotes = policy.notes || '';
  }

  clearSelection(): void {
    this.selectedPolicy = null;
    this.actionNotes = '';
  }

  approvePolicy(): void {
    if (!this.selectedPolicy) return;

    const agentId = 123; // This would come from authentication service
    
    this.policyService.agentApprove(this.selectedPolicy.id, {
      agent_id: agentId,
      notes: this.actionNotes
    }).subscribe({
      next: (updatedPolicy: Policy) => {
        // Update the policy in the list
        const index = this.policies.findIndex(p => p.id === updatedPolicy.id);
        if (index !== -1) {
          this.policies[index] = updatedPolicy;
        }
        
        this.applyFilters();
        this.calculateStats();
        this.prepareChartData();
        this.clearSelection();
        
        // Show success notification
        this.showNotification('Policy approved successfully!', 'success');
      },
      error: (err) => {
        console.error('Error approving policy:', err);
        this.showNotification('Failed to approve policy. Please try again.', 'error');
      }
    });
  }

  rejectPolicy(): void {
    if (!this.selectedPolicy) return;

    this.policyService.rejectPolicy(this.selectedPolicy.id, {
      notes: this.actionNotes || 'Rejected by agent'
    }).subscribe({
      next: (updatedPolicy: Policy) => {
        // Update the policy in the list
        const index = this.policies.findIndex(p => p.id === updatedPolicy.id);
        if (index !== -1) {
          this.policies[index] = updatedPolicy;
        }
        
        this.applyFilters();
        this.calculateStats();
        this.prepareChartData();
        this.clearSelection();
        
        this.showNotification('Policy rejected successfully!', 'success');
      },
      error: (err) => {
        console.error('Error rejecting policy:', err);
        this.showNotification('Failed to reject policy. Please try again.', 'error');
      }
    });
  }

  updateNotes(): void {
    if (!this.selectedPolicy) return;

    this.policyService.updatePolicyNotes(this.selectedPolicy.id, this.actionNotes)
      .subscribe({
        next: (updatedPolicy: Policy) => {
          // Update the policy in the list
          const index = this.policies.findIndex(p => p.id === updatedPolicy.id);
          if (index !== -1) {
            this.policies[index] = updatedPolicy;
          }
          
          this.showNotification('Notes updated successfully!', 'success');
        },
        error: (err) => {
          console.error('Error updating notes:', err);
          this.showNotification('Failed to update notes. Please try again.', 'error');
        }
      });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING': return 'status-pending';
      case 'AGENT_APPROVED': return 'status-approved';
      case 'CONFIRMED': return 'status-confirmed';
      case 'REJECTED': return 'status-rejected';
      default: return 'status-unknown';
    }
  }

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

  canApprove(policy: Policy): boolean {
    return policy.status === 'PENDING';
  }

  canReject(policy: Policy): boolean {
    return policy.status === 'PENDING' || policy.status === 'AGENT_APPROVED';
  }

  refreshPolicies(): void {
    this.loadPolicies();
    this.clearSelection();
  }

  showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    // This would be implemented with a notification service
    // For now, we'll use a simple alert
    alert(`${type.toUpperCase()}: ${message}`);
  }

  // Calculate percentage for progress bars
  getPercentage(value: number): number {
    return this.stats.total > 0 ? (value / this.stats.total) * 100 : 0;
  }
}