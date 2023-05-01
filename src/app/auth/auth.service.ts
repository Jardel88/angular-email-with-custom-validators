import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface UsernameAvailableResponse {
  available: true
}

export interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://api.angular-email.com';

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http
    .post<UsernameAvailableResponse>(`${this.baseUrl}/auth/username`, { username })
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(
      `${this.baseUrl}/auth/signup`, credentials
    )
  }
}
