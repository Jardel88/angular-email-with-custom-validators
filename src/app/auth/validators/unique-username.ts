import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({ providedIn: 'root'})
export class UniqueUsername implements AsyncValidator{

  constructor(private http: HttpClient){

  }
  validate = (control: AbstractControl): any => {
    const { value } = control;
    return this.http.post<any>('https://api.angular-email.com/auth/username', { username: value })
      .pipe(
        map(() => {
          return null;
        }),
        catchError((err) => {
          if (err.error.username) {
            return of({ nonUniqueUsername: true})
          } else {
            return of({ noConnection: true})
          }
        })
      )
  }

}
