import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-navigation',
  standalone: false,
  templateUrl: 'dashboard-navigation.html',
})
export class DashboardNavigationComponent {

  constructor(private router: Router) {}


  navigate(role: string): void {

    switch (role) {
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      case 'teacher':
        this.router.navigate(['/teacher']);
        break;
      case 'student':
        this.router.navigate(['/student']);
        break;
      default:
        break;
    }
  }



}
