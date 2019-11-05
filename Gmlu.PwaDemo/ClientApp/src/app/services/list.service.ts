import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl + 'list';
// const baseUrl = '/api/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) {}

  public get(): Observable<string[]> {
    return this.http.get<string[]>(baseUrl);
  }
}
