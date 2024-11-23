import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { MetadataEndpoints } from './apis';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  http: HttpClient = inject(HttpClient);
  user = new BehaviorSubject<any>(null);
  toastr: ToastrService = inject(ToastrService);
  router: Router = inject(Router);

  setToken(token: string ){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}` 
      })
    };
    return httpOptions;
  }


  extractExif(file: File, token: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    console.log(file)
   
    return this.http.post(MetadataEndpoints.EXIF_API, formData, this.setToken(token) ).pipe(
      catchError((error) => this.handleError(error, 'EXIF')) // Catch and handle errors
    );
  }

  extractHeader(file: File, token: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);


    return this.http.post<any>(MetadataEndpoints.HEADER_API, formData, this.setToken(token)).pipe(
      catchError((error) => this.handleError(error, 'Header Structure'))
    );
  }

   // Error handler
   private handleError(error: HttpErrorResponse,msg: string): Observable<never> {
    console.error('API Error:', error);
    if (error.status === 401) {
      return throwError('Unauthorized: Your session may have expired. Please log in again.');
    } else if (error.status === 404) {
      return throwError(`No ${msg} data found in the uploaded image.`);
    } else if (error.status === 500) {
      return throwError('Internal Server Error: Something went wrong on the server.');
    } else {
      return throwError(`Unexpected Error: ${error.message}`);
    }
  }

}
