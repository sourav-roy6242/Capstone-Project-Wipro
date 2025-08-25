// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-login-agent',
//   templateUrl: './login-agent.component.html',
//   styleUrls: ['./login-agent.component.css']
// })
// export class LoginAgentComponent {
//   loginData = { username: '', password: '' };
//   message: string = '';
//   success: boolean = false;

//   constructor(private authService: AuthService, private router: Router) {}

//   onLogin() {
//     if (!this.loginData.username || !this.loginData.password) {
//       this.message = 'Please enter username and password';
//       this.success = false;
//       return;
//     }

//     this.authService.login(this.loginData.username, this.loginData.password)
//       .subscribe({
//         next: (res: any) => {
//           this.message = 'Login successful!';
//           this.success = true;

//           // Redirect based on role
//           setTimeout(() => {
//             if (res.role === 'agent') this.router.navigate(['/agent-page']);
//             if (res.role === 'user') this.router.navigate(['/user-page']);
//             if (res.role === 'admin') this.router.navigate(['/admin-dashboard']);
//           }, 1000); // delay to show success message
//         },
//         error: (err) => {
//           this.message = err.error?.message || 'Login failed!';
//           this.success = false;
//         }
//       });
//   }
// }




import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-agent',
  templateUrl: './login-agent.component.html',
  styleUrls: ['./login-agent.component.css']
})
export class LoginAgentComponent {
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
          this.message = 'Login successful!';
          this.success = true;

          // Save user data to localStorage
          if (res.user) {
            const userData = {
              username: res.user.username,
              role: res.role || 'agent',
              // Add any other user data you receive from the server
              ...res.user
            };
            this.authService.setUser(userData);
          } else {
            // Fallback if user object is not in response
            const userData = {
              username: this.loginData.username,
              role: res.role || 'agent'
            };
            this.authService.setUser(userData);
          }

          // Redirect based on role
          setTimeout(() => {
            if (res.role === 'agent') this.router.navigate(['/agent-page']);
            else if (res.role === 'user') this.router.navigate(['/user-page']);
            else if (res.role === 'admin') this.router.navigate(['/admin-dashboard']);
          }, 1000); // delay to show success message
        },
        error: (err) => {
          this.message = err.error?.message || 'Login failed!';
          this.success = false;
        }
      });
  }
}