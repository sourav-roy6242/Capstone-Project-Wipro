
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Policy {
  id: number;
  user_id: number;
  policy_type: string;
  premium: number;
  status: string;
  notes?: string;
  agent_id?: number;
  admin_id?: number;
  agent_approved_at?: string;
  admin_approved_at?: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private apiUrl = 'http://localhost:5002/api'; // Your Flask API URL

  constructor(private http: HttpClient) { }

  // Get all policies
  getPolicies(): Observable<Policy[]> {
    return this.http.get<Policy[]>(`${this.apiUrl}/policies`);
  }

  // Get a single policy by ID
  getPolicy(id: number): Observable<Policy> {
    return this.http.get<Policy>(`${this.apiUrl}/policies/${id}`);
  }

  // Request a new policy
  requestPolicy(policyData: any): Observable<Policy> {
    return this.http.post<Policy>(`${this.apiUrl}/policies`, policyData);
  }

  // Get policies by user ID
  getPoliciesByUser(userId: number): Observable<Policy[]> {
    return this.http.get<Policy[]>(`${this.apiUrl}/policies/user/${userId}`);
  }

  // Get policies by status
  getPoliciesByStatus(status: string): Observable<Policy[]> {
    return this.http.get<Policy[]>(`${this.apiUrl}/policies/status/${status}`);
  }

  // Agent approves a policy
  agentApprove(policyId: number, agentData: any): Observable<Policy> {
    return this.http.put<Policy>(`${this.apiUrl}/policies/${policyId}/agent-approve`, agentData);
  }

  // Admin approves a policy
  adminApprove(policyId: number, adminData: any): Observable<Policy> {
    return this.http.put<Policy>(`${this.apiUrl}/policies/${policyId}/admin-approve`, adminData);
  }

  // Reject a policy
  rejectPolicy(policyId: number, rejectionData: any): Observable<Policy> {
    return this.http.put<Policy>(`${this.apiUrl}/policies/${policyId}/reject`, rejectionData);
  }

  // Update policy notes
  updatePolicyNotes(policyId: number, notes: string): Observable<Policy> {
    return this.http.put<Policy>(`${this.apiUrl}/policies/${policyId}/notes`, { notes });
  }
}