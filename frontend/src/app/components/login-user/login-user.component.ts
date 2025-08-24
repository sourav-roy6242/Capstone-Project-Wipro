import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
  loginData = { username: '', password: '' };
  message: string = '';
  success: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    if (!this.loginData.username || !this.loginData.password) {
      this.showMessage('Please enter username and password', false);
      return;
    }

    this.http.post<any>('http://127.0.0.1:5001/auth/login', this.loginData)
      .subscribe({
        next: (res) => {
          this.showMessage(res.message, true);
          setTimeout(() => {
            if (res.role === 'user') this.router.navigate(['/user-page']);
            else if (res.role === 'agent') this.router.navigate(['/agent-page']);
            else if (res.role === 'admin') this.router.navigate(['/admin-dashboard']);
          }, 1500);
        },
        error: (err) => {
          this.showMessage(err.error?.message || 'Login failed', false);
        }
      });
  }

  showMessage(msg: string, success: boolean) {
    this.message = msg;
    this.success = success;
    // auto-clear message after 2 seconds
    setTimeout(() => this.message = '', 2000);
  }
}
