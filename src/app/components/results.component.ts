import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
//import { MatPaginator, MatTableDataSource } from '@angular/material';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import {ResultService} from '../results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit, OnDestroy {

  @Input()
  defaultQuery = 'Trump';

  search = {};
  dataSearch = {};
  currentPage = 1;
  totalPage = 0;

  private sub: Subscription;

  constructor(private http: HttpClient, private resultSvc: ResultService) { }

  ngOnInit() {
    this.sub = this.resultSvc.searchEvent.subscribe(
      (data) => {
        console.log('>>> result service event: ', data);
        this.resultSvc.getSearchQuery(data)
          .then((search) => {
            this.search = search;
            this.dataSearch = search.data;
            this.totalPage = Math.ceil((search.pagination.total_count)/25);
          });
      },
      (error) => {
        console.log('>>> result service error: ', error);
      }
    );

    this.resultSvc.getSearchQuery(this.defaultQuery)  
      .then(search => {
        console.log('>>> search: ', search);
        this.search = search;
        this.dataSearch = search.data;
        this.totalPage = Math.ceil((search.pagination.total_count)/25);
      }).catch(error => {
          console.log('>> error: ', error);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
