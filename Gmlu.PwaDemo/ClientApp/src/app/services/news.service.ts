import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { News } from '../models/news.model';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl + 'news';
// const baseUrl = '/api/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) {}

  public get(): Observable<News[]> {
    return this.http.get<News[]>(baseUrl);
  }
}
