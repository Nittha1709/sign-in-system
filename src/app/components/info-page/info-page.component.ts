import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-page',
  standalone: true,
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css'],
})
export class InfoPageComponent {
  email: string = '';
  avatarUrl: string = '';

  constructor(private router: Router) {
    this.email = sessionStorage.getItem('email') || '';
    this.avatarUrl = sessionStorage.getItem('avatar') || '';
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
