import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as CryptoJS from 'crypto-js';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login-form',
  standalone: true,
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css', '../../../styles.css'],
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
    NzButtonModule,
    NzIconModule
  ],
})
export class LoginFormComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  emailStatus: string = '';
  passwordStatus: string = '';
  isFormValid: boolean = false;
  isPasswordVisible: boolean = false;
  statusMessage: string = ''; 

  constructor(private authService: AuthService, private router: Router) {
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      console.log('Session found. Clearing session storage...');
      sessionStorage.clear();
    }
  }
  onSubmit(): void {
    if (!this.isFormValid) {
      return;
    }

    this.isLoading = true;
    this.statusMessage = 'กำลังเรียกไปที่ API...';

    of(null)
      .pipe(
        delay(3000), 
        concatMap(() => {
          this.statusMessage = 'ได้รับ Token...';
          return this.authService.login(this.email, this.encryptPassword(this.password));
        }),
        delay(3000), 
        concatMap((response) => {
          sessionStorage.setItem('authToken', response.token);
          sessionStorage.setItem('email', response.email);
          sessionStorage.setItem('avatar', response.avatar);
          this.statusMessage = 'กำลังเปลี่ยนไปหน้า info...';
          return of(response).pipe(delay(3000)); 
        })
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/info']);
        },
        error: (err) => {
          this.isLoading = false;
          this.statusMessage = 'เกิดข้อผิดพลาด: ' + (err.message || 'Login failed!');
        },
      });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailStatus = emailRegex.test(this.email) ? 'success' : 'error';
    this.updateFormValidity();
  }

  validatePassword(): void {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Za-z]).{8,}$/;
    this.passwordStatus = passwordRegex.test(this.password) ? 'success' : 'error';
    this.updateFormValidity();
  }

  updateFormValidity(): void {
    this.isFormValid = this.emailStatus === 'success' && this.passwordStatus === 'success';
  }

  encryptPassword(password: string): string {
    const key = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012');
    const iv = CryptoJS.enc.Utf8.parse('1234567890123456');
    const encrypted = CryptoJS.AES.encrypt(password, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
    });

    return encrypted.toString();
  }
}
