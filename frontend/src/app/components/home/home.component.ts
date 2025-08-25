// import { Component, AfterViewInit, HostListener } from '@angular/core';
// import { Router } from '@angular/router';

// interface HeroSlide {
//   image: string;
//   quote: string;
//   subText: string;
// }

// interface Testimonial {
//   text: string;
//   name: string;
//   role: string;
//   avatar: string;
// }

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements AfterViewInit {
//   loginDropdownOpen = false;

//   // Hero slides
//   heroSlides: HeroSlide[] = [
//     { image: 'assets/img1.jpg', quote: 'Protect What Matters Most to You', subText: 'Comprehensive insurance solutions tailored to your unique needs.' },
//     { image: 'assets/img2.jpg', quote: 'Secure Your Family’s Future', subText: 'Flexible life insurance plans to give you peace of mind.' },
//     { image: 'assets/img3.jpg', quote: 'Reliable Auto Insurance', subText: 'Coverage that keeps you safe on every journey.' },
//     { image: 'assets/img4.jpg', quote: 'Health Protection You Can Trust', subText: 'Comprehensive plans for you and your loved ones.' }
//   ];
//   currentSlide = 0;
//   slideInterval: any;

//   // Testimonials
//   testimonials: Testimonial[] = [
//     { text: 'InsuranceCo provided me with exactly the coverage I needed at a price I could afford. When I had to make a claim after a car accident, their team was incredibly supportive and made the process stress-free.', name: 'Sarah Johnson', role: 'Auto Insurance Client', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
//     { text: 'The life insurance plan I chose gave me peace of mind knowing my family is protected. Excellent support from the team!', name: 'John Smith', role: 'Life Insurance Client', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
//     { text: 'Quick claim processing and professional staff. I highly recommend InsuranceCo for anyone looking for reliable coverage.', name: 'Emily Davis', role: 'Home Insurance Client', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
//     { text: 'Health insurance coverage was straightforward and affordable. The support team guided me through every step.', name: 'Michael Brown', role: 'Health Insurance Client', avatar: 'https://randomuser.me/api/portraits/men/54.jpg' }
//   ];
//   currentTestimonial = 0;
//   testimonialInterval: any;

//   constructor(private router: Router) {}

//   ngAfterViewInit(): void {
//     this.startAutoSlide();         // Hero slider auto-slide
//     this.startTestimonialSlider(); // Testimonial auto-slide

//     setTimeout(() => this.onWindowScroll(), 100); // Scroll animations
//   }

//   // Hero Slider
//   startAutoSlide() {
//     this.slideInterval = setInterval(() => this.nextSlide(), 5000);
//   }
//   prevSlide() { this.currentSlide = (this.currentSlide - 1 + this.heroSlides.length) % this.heroSlides.length; }
//   nextSlide() { this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length; }
//   goToSlide(index: number) { this.currentSlide = index; }

//   // Testimonial Slider
//   startTestimonialSlider() {
//     this.testimonialInterval = setInterval(() => this.nextTestimonial(), 5000);
//   }
//   nextTestimonial() { this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length; }
//   prevTestimonial() { this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length; }
//   goToTestimonial(index: number) { this.currentTestimonial = index; }

//   // Mobile Menu
//   toggleMenu() {
//     const navLinks = document.querySelector('.nav-links');
//     if (navLinks) navLinks.classList.toggle('active');
//   }
//   toggleLoginDropdown() { this.loginDropdownOpen = !this.loginDropdownOpen; }
//   @HostListener('document:click', ['$event'])
//   onDocumentClick(event: MouseEvent) {
//     const target = event.target as HTMLElement;
//     if (!target.closest('.dropdown')) this.loginDropdownOpen = false;
//   }

//   // Scroll Animations and Stats
//   @HostListener('window:scroll', [])
//   onWindowScroll() {
//     const elements = document.querySelectorAll('.feature-card, .testimonial-card, .insurance-card');
//     elements.forEach(el => {
//       const pos = el.getBoundingClientRect();
//       if (pos.top < window.innerHeight - 100) el.classList.add('animate');
//     });

//     const statsSection = document.querySelector('.stats');
//     if (statsSection) {
//       const sectionPos = statsSection.getBoundingClientRect();
//       if (sectionPos.top < window.innerHeight - 50) this.animateStats();
//     }
//   }

//   private animateStats() {
//     const counters = document.querySelectorAll('.stat-number');
//     counters.forEach(counter => {
//       const targetText = counter.getAttribute('data-target') || counter.textContent || '0';
//       let suffix = '', target = 0;
//       const match = targetText.match(/(\d+)(.*)/);
//       if (match) { target = parseInt(match[1], 10); suffix = match[2] || ''; }
//       if (counter.getAttribute('data-animated') === 'true') return;
//       counter.setAttribute('data-animated', 'true');
//       let count = 0;
//       const increment = Math.ceil(target / 100);
//       const updateCount = () => {
//         count += increment;
//         if (count > target) count = target;
//         counter.textContent = count + suffix;
//         if (count < target) requestAnimationFrame(updateCount);
//         else setTimeout(() => counter.removeAttribute('data-animated'), 1000);
//       };
//       updateCount();
//     });
//   }
// }








// import { Component, OnInit, HostListener } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   currentSlide = 0;
//   currentTestimonial = 0;
//   isVisible: { [key: string]: boolean } = {
//     features: false,
//     stats: false,
//     insurance: false,
//     testimonials: false,
//     cta: false
//   };
  
//   // Stats data
//   stats = {
//     customerSatisfaction: 95,
//     policiesIssued: 50,
//     yearsExperience: 15
//   };
  
//   heroSlides = [
//     {
//       image: 'assets/img1.jpg',
//       quote: 'Protect What Matters Most',
//       subText: 'Comprehensive insurance solutions for your peace of mind'
//     },
//     {
//       image: 'assets/img2.jpg',
//       quote: 'Your Safety is Our Priority',
//       subText: 'Trusted by thousands for reliable coverage'
//     },
//     {
//       image: 'assets/img3.jpg', 
//       quote: 'Future-Proof Your Life',
//       subText: 'Smart insurance solutions for modern living'
//     },
//     {
//       image: 'assets/img4.jpg', 
//       quote: 'Future-Proof Your Life',
//       subText: 'Smart insurance solutions for modern living'
//     }
//   ];
  
//   testimonials = [
//     {
//       text: 'InsuranceCo provided me with the perfect coverage for my new home. Their customer service was exceptional throughout the entire process.',
//       name: 'Sarah Johnson',
//       role: 'Homeowner',
//       avatar: 'assets/avatar1.jpg'
//     },
//     {
//       text: 'As a small business owner, finding the right insurance was crucial. InsuranceCo tailored a plan that perfectly fits my needs and budget.',
//       name: 'Michael Chen',
//       role: 'Business Owner',
//       avatar: 'assets/avatar2.jpg'
//     },
//     {
//       text: 'The claims process was incredibly smooth and stress-free. I received my settlement faster than I expected. Highly recommend InsuranceCo!',
//       name: 'Emily Rodriguez',
//       role: 'Auto Policyholder',
//       avatar: 'assets/avatar3.jpg'
//     }
//   ];

//   ngOnInit() {
//     // Initialize slider autoplay
//     this.startSlider();
//     this.startTestimonialSlider();
    
//     // Initialize intersection observer for animations
//     this.initAnimations();
//   }
  
//   startSlider() {
//     setInterval(() => {
//       this.nextSlide();
//     }, 3000);
//   }
  
//   startTestimonialSlider() {
//     setInterval(() => {
//       this.nextTestimonial();
//     }, 2000);
//   }
  
//   nextSlide() {
//     this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;
//   }
  
//   prevSlide() {
//     this.currentSlide = (this.currentSlide - 1 + this.heroSlides.length) % this.heroSlides.length;
//   }
  
//   goToSlide(index: number) {
//     this.currentSlide = index;
//   }
  
//   nextTestimonial() {
//     this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
//   }
  
//   prevTestimonial() {
//     this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
//   }
  
//   goToTestimonial(index: number) {
//     this.currentTestimonial = index;
//   }
  
//   initAnimations() {
//     // Check visibility on initial load
//     this.checkVisibility();
//   }
  
//   @HostListener('window:scroll', [])
//   onWindowScroll() {
//     this.checkVisibility();
    
//     const header = document.querySelector('header');
//     if (header) {
//       if (window.scrollY > 50) {
//         header.classList.add('scrolled');
//       } else {
//         header.classList.remove('scrolled');
//       }
//     }
//   }
  
//   checkVisibility() {
//     // Simple implementation to check if sections are in viewport
//     const sections = ['features', 'stats', 'insurance', 'testimonials', 'cta'];
    
//     sections.forEach(section => {
//       const element = document.querySelector(`.${section}`);
//       if (element) {
//         const rect = element.getBoundingClientRect();
//         const isInViewport = rect.top <= (window.innerHeight * 0.75) && rect.bottom >= 0;
        
//         if (isInViewport && !this.isVisible[section]) {
//           this.isVisible[section] = true;
          
//           // Animate stats when stats section becomes visible
//           if (section === 'stats') {
//             this.animateStats();
//           }
//         }
//       }
//     });
//   }
  
//   toggleMenu() {
//     const navLinks = document.querySelector('.nav-links');
//     if (navLinks) {
//       navLinks.classList.toggle('active');
//     }
//   }
  
//   // Animate stats counter
//   animateStats() {
//     const duration = 2000; // ms
//     const steps = 60;
//     const increment = this.stats.customerSatisfaction / steps;
//     const incrementPolicies = this.stats.policiesIssued / steps;
//     const incrementYears = this.stats.yearsExperience / steps;
    
//     let current = 0;
//     let currentPolicies = 0;
//     let currentYears = 0;
    
//     const timer = setInterval(() => {
//       current += increment;
//       currentPolicies += incrementPolicies;
//       currentYears += incrementYears;
      
//       if (current >= this.stats.customerSatisfaction) {
//         current = this.stats.customerSatisfaction;
//         currentPolicies = this.stats.policiesIssued;
//         currentYears = this.stats.yearsExperience;
//         clearInterval(timer);
//       }
      
//       // Update the displayed values
//       this.stats.customerSatisfaction = Math.round(current);
//       this.stats.policiesIssued = Math.round(currentPolicies);
//       this.stats.yearsExperience = Math.round(currentYears);
//     }, duration / steps);
//   }
// }






// import { Component, OnInit, HostListener } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   currentSlide = 0;
//   currentTestimonial = 0;
//   isVisible: { [key: string]: boolean } = {
//     features: false,
//     stats: false,
//     insurance: false,
//     testimonials: false,
//     cta: false
//   };
  
//   // Original stats data
//   stats = {
//     customerSatisfaction: 95,
//     policiesIssued: 50,
//     yearsExperience: 15
//   };
  
//   // Animated stats data
//   animatedStats = {
//     customerSatisfaction: 0,
//     policiesIssued: 0,
//     yearsExperience: 0
//   };
  
//   // Track if stats have been animated to prevent re-animation
//   statsAnimated = false;
  
//   heroSlides = [
//     {
//       image: 'assets/img1.jpg',
//       quote: 'Protect What Matters Most',
//       subText: 'Comprehensive insurance solutions for your peace of mind'
//     },
//     {
//       image: 'assets/img2.jpg',
//       quote: 'Your Safety is Our Priority',
//       subText: 'Trusted by thousands for reliable coverage'
//     },
//     {
//       image: 'assets/img3.jpg', 
//       quote: 'Future-Proof Your Life',
//       subText: 'Smart insurance solutions for modern living'
//     },
//     {
//       image: 'assets/img4.jpg', 
//       quote: 'Future-Proof Your Life',
//       subText: 'Smart insurance solutions for modern living'
//     }
//   ];
  
//   testimonials = [
//     {
//       text: 'InsuranceCo provided me with the perfect coverage for my new home. Their customer service was exceptional throughout the entire process.',
//       name: 'Sarah Johnson',
//       role: 'Homeowner',
//       avatar: 'assets/avatar1.jpg'
//     },
//     {
//       text: 'As a small business owner, finding the right insurance was crucial. InsuranceCo tailored a plan that perfectly fits my needs and budget.',
//       name: 'Michael Chen',
//       role: 'Business Owner',
//       avatar: 'assets/avatar2.jpg'
//     },
//     {
//       text: 'The claims process was incredibly smooth and stress-free. I received my settlement faster than I expected. Highly recommend InsuranceCo!',
//       name: 'Emily Rodriguez',
//       role: 'Auto Policyholder',
//       avatar: 'assets/avatar3.jpg'
//     }
//   ];

//   ngOnInit() {
//     // Initialize slider autoplay
//     this.startSlider();
//     this.startTestimonialSlider();
    
//     // Initialize intersection observer for animations
//     this.initAnimations();
//   }
  
//   startSlider() {
//     setInterval(() => {
//       this.nextSlide();
//     }, 5000); // Increased to 5 seconds for better UX
//   }
  
//   startTestimonialSlider() {
//     setInterval(() => {
//       this.nextTestimonial();
//     }, 4000); // Increased to 4 seconds for better UX
//   }
  
//   nextSlide() {
//     this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;
//   }
  
//   prevSlide() {
//     this.currentSlide = (this.currentSlide - 1 + this.heroSlides.length) % this.heroSlides.length;
//   }
  
//   goToSlide(index: number) {
//     this.currentSlide = index;
//   }
  
//   nextTestimonial() {
//     this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
//   }
  
//   prevTestimonial() {
//     this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
//   }
  
//   goToTestimonial(index: number) {
//     this.currentTestimonial = index;
//   }
  
//   initAnimations() {
//     // Check visibility on initial load
//     this.checkVisibility();
//   }
  
//   @HostListener('window:scroll', [])
//   onWindowScroll() {
//     this.checkVisibility();
    
//     const header = document.querySelector('header');
//     if (header) {
//       if (window.scrollY > 50) {
//         header.classList.add('scrolled');
//       } else {
//         header.classList.remove('scrolled');
//       }
//     }
//   }
  
//   checkVisibility() {
//     // Check if stats section is in viewport
//     const statsSection = document.getElementById('stats-section');
//     if (statsSection && !this.statsAnimated) {
//       const rect = statsSection.getBoundingClientRect();
//       const isInViewport = rect.top <= (window.innerHeight * 0.75) && rect.bottom >= 0;
      
//       if (isInViewport) {
//         this.isVisible['stats'] = true;
//         this.animateStats();
//         this.statsAnimated = true;
//       }
//     }
    
//     // Check other sections
//     const sections = ['features', 'insurance', 'testimonials', 'cta'];
    
//     sections.forEach(section => {
//       const element = document.querySelector(`.${section}`);
//       if (element) {
//         const rect = element.getBoundingClientRect();
//         const isInViewport = rect.top <= (window.innerHeight * 0.75) && rect.bottom >= 0;
        
//         if (isInViewport && !this.isVisible[section]) {
//           this.isVisible[section] = true;
//         }
//       }
//     });
//   }
  
//   toggleMenu() {
//     const navLinks = document.querySelector('.nav-links');
//     if (navLinks) {
//       navLinks.classList.toggle('active');
//     }
//   }
  
//   // Animate stats counter
//   animateStats() {
//     const duration = 2000; // ms
//     const steps = 60;
//     const increment = this.stats.customerSatisfaction / steps;
//     const incrementPolicies = this.stats.policiesIssued / steps;
//     const incrementYears = this.stats.yearsExperience / steps;
    
//     let current = 0;
//     let currentPolicies = 0;
//     let currentYears = 0;
    
//     const timer = setInterval(() => {
//       current += increment;
//       currentPolicies += incrementPolicies;
//       currentYears += incrementYears;
      
//       // Update the displayed values
//       this.animatedStats.customerSatisfaction = Math.round(current);
//       this.animatedStats.policiesIssued = Math.round(currentPolicies);
//       this.animatedStats.yearsExperience = Math.round(currentYears);
      
//       if (current >= this.stats.customerSatisfaction) {
//         this.animatedStats.customerSatisfaction = this.stats.customerSatisfaction;
//         this.animatedStats.policiesIssued = this.stats.policiesIssued;
//         this.animatedStats.yearsExperience = this.stats.yearsExperience;
//         clearInterval(timer);
//       }
//     }, duration / steps);
//   }
// }








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
