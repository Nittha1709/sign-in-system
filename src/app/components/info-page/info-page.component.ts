import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
  selector: 'app-info-page',
  standalone: true,
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css', '../../../styles.css'],
      imports: [
NzButtonModule  
  ],
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
