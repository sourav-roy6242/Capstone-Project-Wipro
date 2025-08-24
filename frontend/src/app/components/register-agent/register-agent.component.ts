import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-agent',
  templateUrl: './register-agent.component.html',
  styleUrls: ['./register-agent.component.css']
})
export class RegisterAgentComponent {
  registerData = { username: '', password: '', role: 'agent' };
  message: string = '';
  success: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (!this.registerData.username || !this.registerData.password) {
      this.message = 'Please fill all fields';
      this.success = false;
      return;
    }

    this.authService.register(this.registerData.username, this.registerData.password, this.registerData.role)
      .subscribe({
        next: (res: any) => {
          this.message = res.message;
          this.success = true;

          // Redirect to login page after 1 second
          setTimeout(() => this.router.navigate(['/login-agent']), 1000);
        },
        error: (err) => {
          this.message = err.error?.message || 'Registration failed!';
          this.success = false;
        }
      });
  }
}
