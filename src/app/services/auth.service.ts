import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return of({
      token: 'dummy-token',
      email: email,
      avatar: 'https://i.pinimg.com/736x/4b/61/43/4b61432b96d97cda90bb7fca37310194.jpg',
    }).pipe(delay(3000)); 
  }
}
