import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://localhost:5001/api/vapid';

@Injectable({
  providedIn: 'root'
})
export class VapidService {

  constructor(
    private http: HttpClient,
  ) { }

  public get(): Observable<string> {
    return this.http.get<string>(baseUrl);
  }
}
