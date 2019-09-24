import { News } from './../../models/news.model';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public news$: Subject<News[]> = new Subject<News[]>();

  constructor(private service: NewsService) {}

  ngOnInit() {
    this.service.get().subscribe(x => this.news$.next(x));
  }
}
