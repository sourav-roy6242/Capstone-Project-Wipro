import { Component } from '@angular/core';
import { ClaimService, Claim } from '../../../services/claim.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-claims',
  templateUrl: './create-claims.component.html',
  styleUrls: ['./create-claims.component.css'],
  
})
export class CreateClaimsComponent {

  claimForm: FormGroup;
  message: string = '';
  policyTypes: string[] = ['Auto', 'Home', 'Life', 'Health'];  // <-- Add this

  constructor(private fb: FormBuilder, private claimService: ClaimService) {
    this.claimForm = this.fb.group({
      user_name: ['', Validators.required],
      policy_id: ['', Validators.required],
      policy_type: ['', Validators.required],  // will use dropdown
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  submitClaim() {
    if (this.claimForm.valid) {
      this.claimService.submitClaim(this.claimForm.value).subscribe({
        next: (res) => {
          this.message = 'Claim submitted successfully!';
          this.claimForm.reset();
        },
        error: (err) => {
          this.message = 'Error submitting claim';
          console.error(err);
        }
      });
    }
  }
}
