// import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css'],
//   encapsulation: ViewEncapsulation.None
// })
// export class NavbarComponent implements OnInit {
//   user: any = null;
//   menuOpen = false;
//   dropdownOpen = false;

//   constructor(private auth: AuthService, private router: Router) {}

//   ngOnInit() {
//     this.user = this.auth.getUser();  // ✅ load logged-in usera
//   }

//   toggleMenu() {
//     this.menuOpen = !this.menuOpen;
//   }

//   toggleDropdown() {
//     this.dropdownOpen = !this.dropdownOpen;
//   }

//   logout() {
//     this.auth.logout();
//     this.user = null;
//     this.dropdownOpen = false;
//   }

//   goToProfile() {
//     this.router.navigate(['/profile']);
//     this.dropdownOpen = false;
//   }
// }




import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any = null;
  menuOpen = false;
  dropdownOpen = false;
  private checkInterval: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Get initial user state
    this.user = this.authService.getUser();
    
    // Set up interval to check for user changes
    this.checkInterval = setInterval(() => {
      this.checkUserState();
    }, 1000);
  }

  ngOnDestroy() {
    // Clear interval when component is destroyed
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }

  checkUserState() {
    const currentUser = this.authService.getUser();
    
    // Only update if user state has actually changed
    if (JSON.stringify(currentUser) !== JSON.stringify(this.user)) {
      this.user = currentUser;
    }
  }

  getUserInitial(): string {
    if (!this.user) return 'U';
    
    if (this.user.username) {
      return this.user.username.charAt(0).toUpperCase();
    } else if (this.user.name) {
      return this.user.name.charAt(0).toUpperCase();
    } else {
      return 'U';
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.dropdownOpen = false;
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    if (this.dropdownOpen) {
      this.menuOpen = false;
    }
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  closeMobileMenu() {
    this.menuOpen = false;
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.dropdownOpen = false;
    this.menuOpen = false;
  }

  goToProfile() {
    this.dropdownOpen = false;
    this.menuOpen = false;
    
    // Navigate to appropriate profile based on user role
    if (this.user && this.user.role) {
      this.router.navigate([`/profile-${this.user.role.toLowerCase()}`]);
    } else {
      this.router.navigate(['/profile']);
    }
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.dropdownOpen = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    // Close menu on larger screens
    if (window.innerWidth > 768) {
      this.menuOpen = false;
    }
  }
}