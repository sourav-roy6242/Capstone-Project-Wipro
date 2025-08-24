import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  registerData = { username: '', password: '', role: 'user' };
  message: string = '';
  success: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    if (!this.registerData.username || !this.registerData.password) {
      this.showMessage('Please fill all fields', false);
      return;
    }

    this.http.post<any>('http://127.0.0.1:5001/auth/register', this.registerData)
      .subscribe({
        next: (res) => {
          this.showMessage(res.message, true);
          // Redirect to login after 1.5 sec
          setTimeout(() => this.router.navigate(['/user-page']), 1500);
        },
        error: (err) => {
          this.showMessage(err.error?.message || 'Registration failed', false);
        }
      });
  }

  showMessage(msg: string, success: boolean) {
    this.message = msg;
    this.success = success;
    setTimeout(() => this.message = '', 2000);
  }
}
