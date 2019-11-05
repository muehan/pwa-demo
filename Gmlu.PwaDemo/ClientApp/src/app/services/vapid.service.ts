import { VapidViewModel } from './../models/vapid.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl + 'vapid';

@Injectable({
  providedIn: 'root'
})
export class VapidService {

  constructor(
    private http: HttpClient,
  ) { }

  public get(): Observable<VapidViewModel> {
    return this.http.get<VapidViewModel>(baseUrl);
  }
}
