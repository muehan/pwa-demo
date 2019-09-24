import { ListService } from './../../services/list.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public items: Subject<string[]> = new Subject<string[]>();

  constructor(private service: ListService) {}

  ngOnInit() {
    this.service.get().subscribe(x => {
      this.items.next(x);
    });
  }

  public refresh(): void {
    this.service.get().subscribe(x => {
      this.items.next(x);
    });
  }
}
