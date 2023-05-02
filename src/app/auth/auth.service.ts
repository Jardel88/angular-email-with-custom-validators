import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, tap } from 'rxjs';

interface UsernameAvailableResponse {
  available: true
}

export interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface SigninCredentials {
  username: string;
  password: string;
}

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http
    .post<UsernameAvailableResponse>(`${this.baseUrl}/auth/username`, { username })
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(
      `${this.baseUrl}/auth/signup`, credentials
    ).pipe(
      tap(() => {
        this.signedin$.next(true)
      })
    )
  }

  checkAuth() {
    return this.http.get<SignedinResponse>(`${this.baseUrl}/auth/signedin`)
    .pipe(
      tap(({ authenticated }) => {
        this.signedin$.next(authenticated)
      })
    )
  }

  signout() {
    return this.http.post(`${this.baseUrl}/auth/signout`, {})
    .pipe(
      tap(() => {
        this.signedin$.next(false)
      })
    )
  }

  signin(credentials: SigninCredentials) {
    return this.http.post(`${this.baseUrl}/auth/signin`, credentials)
    .pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    )
  }
}
