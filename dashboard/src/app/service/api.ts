import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Api {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  index<R>(path: string, params?: Record<string, any>): Observable<R> {
    const cleanParams: Record<string, any> = {};
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          cleanParams[key] = params[key];
        }
      });
    }
    return this.http.get<R>(`${this.apiUrl}/${path}`, { params: cleanParams });
  }

  show<R>(path: string, id: string | number): Observable<R> {
    return this.http.get<R>(`${this.apiUrl}/${path}/${id}`);
  }

  store<T, R>(path: string, payload: T): Observable<R> {
    return this.http.post<R>(`${this.apiUrl}/${path}`, payload);
  }

  update<T, R>(path: string, id: string | number, payload: T): Observable<R> {
    return this.http.put<R>(`${this.apiUrl}/${path}/${id}`, payload);
  }

  destroy<T, R>(path: string,id: string | number): Observable<R> {
    return this.http.delete<R>(`${this.apiUrl}/${path}/${id}`,);
  }
}
