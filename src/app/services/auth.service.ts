import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, finalize, tap, throwError } from 'rxjs';
import { authEndpoints } from './apis';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http: HttpClient = inject(HttpClient);
  user = new BehaviorSubject<any>(null);
  toastr: ToastrService = inject(ToastrService);
  router: Router = inject(Router);
  private tokenExpiretimer: any;

  login(email: string, password: string) {

    const loadingToast = this.toastr.info("Logging in", "Please wait...", {
      disableTimeOut: true,
      closeButton: false,
      positionClass: 'toast-top-center'
    });

    let data = new HttpParams();
    data = data.set('email',email);
    data = data.set('password', password);

    return this.http.post(authEndpoints.LOGIN_API+ `?email=${email}&password=${password}`, data ).pipe(
      catchError((error) => {
      if (loadingToast) {
        this.toastr.clear();
      }
      this.toastr.error('Failed to Login', 'Error');
      return throwError(() => error);
    }), finalize(() => {
      if (loadingToast) {
        this.toastr.clear();
      }
    }));
  }
}
