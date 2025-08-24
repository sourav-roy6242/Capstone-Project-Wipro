import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  loginData = { username: '', password: '' };
  message: string = '';
  success: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.loginData.username || !this.loginData.password) {
      this.message = 'Please enter username and password';
      this.success = false;
      return;
    }

    this.authService.login(this.loginData.username, this.loginData.password)
      .subscribe({
        next: (res: any) => {
          if (res.role === 'admin') {
            this.message = 'Admin login successful!';
            this.success = true;
            setTimeout(() => this.router.navigate(['/admin-dashboard']), 1000);
          } else {
            this.message = 'Access denied: Not an admin';
            this.success = false;
          }
        },
        error: (err) => {
          this.message = err.error?.message || 'Login failed!';
          this.success = false;
        }
      });
  }
}
