import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyService } from 'src/app/services/policy.service';

@Component({
  selector: 'app-insurance-policies',
  templateUrl: './insurance-detail.component.html',
  styleUrls: ['./insurance-detail.component.css']
})
export class InsuranceDetailComponent implements OnInit {
  policyType: string = '';
  policyOptions: any[] = [];
  isLoading: boolean = true;

  // Sample data - in real app, this would come from your API
  policyData = {
    auto: [
      {
        id: 1,
        name: 'Basic Auto Coverage',
        description: 'Essential protection for your vehicle with affordable premiums',
        premium: 1200,
        coverage: ['Collision damage', 'Third-party liability', 'Theft protection'],
        features: ['Affordable', 'Basic Protection', '24/7 Claims'],
        icon: 'fas fa-car'
      },
      {
        id: 2,
        name: 'Comprehensive Auto',
        description: 'Complete protection for your vehicle in all scenarios',
        premium: 2500,
        coverage: ['Full collision coverage', 'Natural disaster protection', 'Rental car coverage'],
        features: ['Full Coverage', 'Rental Car', 'Roadside Assistance'],
        icon: 'fas fa-car-crash'
      }
    ],
    home: [
      {
        id: 3,
        name: 'Standard Home Protection',
        description: 'Basic coverage for your home and belongings',
        premium: 1800,
        coverage: ['Fire damage', 'Theft protection', 'Natural disasters'],
        features: ['Basic Coverage', 'Affordable', 'Quick Processing'],
        icon: 'fas fa-home'
      },
      {
        id: 4,
        name: 'Premium Home Coverage',
        description: 'Comprehensive protection for your home and valuable possessions',
        premium: 3500,
        coverage: ['Full structure coverage', 'High-value items', 'Additional living expenses'],
        features: ['Full Protection', 'Valuables Covered', 'Temporary Housing'],
        icon: 'fas fa-house-damage'
      }
    ],
    life: [
      {
        id: 5,
        name: 'Term Life Insurance',
        description: 'Affordable life coverage for a specific period',
        premium: 1500,
        coverage: ['Death benefit', 'Fixed premium', 'Renewable terms'],
        features: ['Affordable', 'Flexible Terms', 'Renewable'],
        icon: 'fas fa-heart'
      },
      {
        id: 6,
        name: 'Whole Life Plan',
        description: 'Lifetime coverage with cash value accumulation',
        premium: 4000,
        coverage: ['Lifetime coverage', 'Cash value', 'Loan options'],
        features: ['Lifetime Coverage', 'Cash Value', 'Loan Facility'],
        icon: 'fas fa-heartbeat'
      }
    ],
    health: [
      {
        id: 7,
        name: 'Basic Health Plan',
        description: 'Essential health coverage for individuals',
        premium: 2000,
        coverage: ['Hospitalization', 'Outpatient care', 'Emergency services'],
        features: ['Essential Coverage', 'Affordable', 'Network Hospitals'],
        icon: 'fas fa-first-aid'
      },
      {
        id: 8,
        name: 'Family Health Plan',
        description: 'Comprehensive health coverage for your entire family',
        premium: 5500,
        coverage: ['Family coverage', 'Preventive care', 'Maternity benefits'],
        features: ['Family Coverage', 'Preventive Care', 'Maternity Included'],
        icon: 'fas fa-hospital-user'
      }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private policyService: PolicyService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.policyType = params.get('type') || '';
      
      if (this.policyType && this.policyData[this.policyType as keyof typeof this.policyData]) {
        this.policyOptions = this.policyData[this.policyType as keyof typeof this.policyData];
        this.isLoading = false;
      } else {
        // Redirect to home if invalid policy type
        this.router.navigate(['/']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  requestPolicy(policy: any): void {
    // In a real application, you would:
    // 1. Get the current user ID from authentication service
    // 2. Call the API to create a policy request
    const userId = 1; // This would come from your auth service
    
    this.policyService.requestPolicy({
      user_id: userId,
      policy_type: `${this.policyType} - ${policy.name}`,
      premium: policy.premium,
      notes: `Requested ${policy.name} policy`
    }).subscribe({
      next: (response: any) => {
        alert('Policy requested successfully! Your request is under review.');
        this.router.navigate(['/dashboard']); // Redirect to user dashboard
      },
      error: (error: any) => {
        console.error('Error requesting policy:', error);
        alert('Failed to request policy. Please try again.');
      }
    });
  }
}