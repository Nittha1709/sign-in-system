import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login-form',
  standalone: true,
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.validateForm()) {
      alert('Invalid email or password format!');
      return;
    }

    this.isLoading = true;

    this.authService.login(this.email, this.encryptPassword(this.password)).subscribe({
      next: (response) => {
        sessionStorage.setItem('authToken', response.token);
        sessionStorage.setItem('email', response.email);
        sessionStorage.setItem('avatar', response.avatar);
        this.isLoading = false;
        this.router.navigate(['/info']);
      },
      error: (err) => {
        alert(err.message || 'Login failed!');
        this.isLoading = false;
      },
    });
  }

  validateForm(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Za-z]).{8,}$/;

    return emailRegex.test(this.email) && passwordRegex.test(this.password);
  }

  encryptPassword(password: string): string {
    const key = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012'); // Example key
    const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // Example IV
    const encrypted = CryptoJS.AES.encrypt(password, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
    });

    return encrypted.toString();
  }
}
