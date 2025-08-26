
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentSlide = 0;
  currentTestimonial = 0;
  isVisible: { [key: string]: boolean } = {
    features: false,
    stats: false,
    insurance: false,
    testimonials: false,
    cta: false
  };

  stats = {
    customerSatisfaction: 95,
    policiesIssued: 50,
    yearsExperience: 15
  };

  animatedStats = {
    customerSatisfaction: 0,
    policiesIssued: 0,
    yearsExperience: 0
  };

  statsAnimated = false;

  heroSlides = [
    { image: 'assets/img1.jpg', quote: 'Protect What Matters Most', subText: 'Comprehensive insurance solutions for your peace of mind' },
    { image: 'assets/img2.jpg', quote: 'Your Safety is Our Priority', subText: 'Trusted by thousands for reliable coverage' },
    { image: 'assets/img3.jpg', quote: 'Future-Proof Your Life', subText: 'Smart insurance solutions for modern living' },
    { image: 'assets/img4.jpg', quote: 'Future-Proof Your Life', subText: 'Smart insurance solutions for modern living' }
  ];

  testimonials = [
    { text: 'InsuranceCo provided me with the perfect coverage...', name: 'Sarah Johnson', role: 'Homeowner', avatar: 'assets/avatar1.jpg' },
    { text: 'As a small business owner, finding the right insurance...', name: 'Michael Chen', role: 'Business Owner', avatar: 'assets/avatar2.jpg' },
    { text: 'The claims process was incredibly smooth...', name: 'Emily Rodriguez', role: 'Auto Policyholder', avatar: 'assets/avatar3.jpg' }
  ];

  // 🔹 Added for Navbar
  user: any = null;
  dropdownOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.startSlider();
    this.startTestimonialSlider();
    this.initAnimations();

    // 🔹 load logged in user
    this.user = this.authService.getUser();
  }

  // Navbar methods
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }


  // 🔹 New method to handle protected navigation 
message: string | null = null;

goTo(path: string) {
  if (!this.authService.isLoggedIn()) {
    this.message = "Please login to continue.";
    this.router.navigate(['/login']);
  } else {
    this.router.navigate([path]);
  }
}


  // Existing slider + animation methods below...
  startSlider() { setInterval(() => this.nextSlide(), 5000); }
  startTestimonialSlider() { setInterval(() => this.nextTestimonial(), 4000); }
  nextSlide() { this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length; }
  prevSlide() { this.currentSlide = (this.currentSlide - 1 + this.heroSlides.length) % this.heroSlides.length; }
  goToSlide(index: number) { this.currentSlide = index; }
  nextTestimonial() { this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length; }
  prevTestimonial() { this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length; }
  goToTestimonial(index: number) { this.currentTestimonial = index; }
  initAnimations() { this.checkVisibility(); }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkVisibility();
    const header = document.querySelector('header');
    if (header) {
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
  }

  checkVisibility() {
    const statsSection = document.getElementById('stats-section');
    if (statsSection && !this.statsAnimated) {
      const rect = statsSection.getBoundingClientRect();
      const isInViewport = rect.top <= (window.innerHeight * 0.75) && rect.bottom >= 0;
      if (isInViewport) {
        this.isVisible['stats'] = true;
        this.animateStats();
        this.statsAnimated = true;
      }
    }

    const sections = ['features', 'insurance', 'testimonials', 'cta'];
    sections.forEach(section => {
      const element = document.querySelector(`.${section}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top <= (window.innerHeight * 0.75) && rect.bottom >= 0;
        if (isInViewport && !this.isVisible[section]) this.isVisible[section] = true;
      }
    });
  }

  toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) navLinks.classList.toggle('active');
  }

  animateStats() {
    const duration = 2000;
    const steps = 60;
    const increment = this.stats.customerSatisfaction / steps;
    const incrementPolicies = this.stats.policiesIssued / steps;
    const incrementYears = this.stats.yearsExperience / steps;

    let current = 0, currentPolicies = 0, currentYears = 0;

    const timer = setInterval(() => {
      current += increment;
      currentPolicies += incrementPolicies;
      currentYears += incrementYears;

      this.animatedStats.customerSatisfaction = Math.round(current);
      this.animatedStats.policiesIssued = Math.round(currentPolicies);
      this.animatedStats.yearsExperience = Math.round(currentYears);

      if (current >= this.stats.customerSatisfaction) {
        this.animatedStats.customerSatisfaction = this.stats.customerSatisfaction;
        this.animatedStats.policiesIssued = this.stats.policiesIssued;
        this.animatedStats.yearsExperience = this.stats.yearsExperience;
        clearInterval(timer);
      }
    }, duration / steps);
  }
}
