import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ResultService} from '../results.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('searchForm')
  searchForm: NgForm;

  @ViewChild('pageForm')
  pageForm: NgForm; 

  constructor(private resultSvc: ResultService) { }

  ngOnInit() { }

  getSearchResults() {
    console.log('>> search: ', this.searchForm.value.search);
    this.resultSvc.searchEvent.emit(this.searchForm.value.search);
    //this.resultSvc.searchEvent.next(this.pageForm.value.searchpage);
  }

  // getSearchResultsPage() {
  //   console.log('>> search: ', this.searchForm.value.search);
  //   //this.resultSvc.searchEvent.next(this.searchForm.value.search);
  //   this.resultSvc.searchEvent.next({search: this.searchForm.value.search, page: this.pageForm.value.searchpage});
  // }

}
