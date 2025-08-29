import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


export interface Claim {
  id?: number;
  user_name: string;
  policy_id: string;
  policy_type: string;
  description: string;
  amount: number;
  date_created?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private apiUrl = 'http://127.0.0.1:5000/claims';

  constructor(private http: HttpClient, private router: Router) {}

  // Get all claims
  listClaims(): Observable<Claim[]> {
    return this.http.get<Claim[]>(`${this.apiUrl}/list`);
  }

  // Submit new claim
  submitClaim(claim: Claim): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit`, claim);
    this.router.navigate(['/']);
  }


  // Approve claim as agent
  agentApprove(claimId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/agent/approve/${claimId}`, {});
  }

  // Approve claim as admin
  adminApprove(claimId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/approve/${claimId}`, {});
  }
}
