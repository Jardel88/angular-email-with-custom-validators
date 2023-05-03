import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface EmailSumary {
  id: string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  baseUrl = 'https://api.angular-email.com';

  constructor(private http: HttpClient) { }

  getEmails() {
    return this.http.get<EmailSumary[]>(`${this.baseUrl}/emails`);
  }
}
