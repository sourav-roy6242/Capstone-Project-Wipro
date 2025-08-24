import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5001/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(username: string, password: string, role: string) {
    return this.http.post(`${this.apiUrl}/register`, { username, password, role });
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }
}
