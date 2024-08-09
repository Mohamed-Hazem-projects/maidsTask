import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentPage, selectTotalPages } from '../../state/userList/usersList.selectors';
import { CommonModule } from '@angular/common';
import { loadUserList } from '../../state/userList/usersList.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit, OnDestroy {

  currentPage: number;
  currentPageSubscription!: Subscription;
  totalPages: number;
  totalPagesSubscription!: Subscription;
  totalPagesArray: number[];
  clickedButton: number;

  constructor(private store: Store) {
    this.currentPage = 1;
    this.totalPages = 1;
    this.totalPagesArray = [];
    this.clickedButton = 1;
  }

  ngOnInit(): void {
    //getting the current page and total number of pages to construct the paginator
    this.currentPageSubscription = this.store.select(selectCurrentPage)
      .subscribe((currentPage) => {
        this.currentPage = currentPage
      })
    this.totalPagesSubscription = this.store.select(selectTotalPages)
      .subscribe((totalPages) => {
        this.totalPages = totalPages;
        this.totalPagesArray = Array(totalPages).fill(0).map((_, i) => i + 1);
      })
  }

  changePage(page: number) {
    if (this.clickedButton != page) {
      this.clickedButton = page;
      this.store.dispatch(loadUserList({ pageNo: page }))
    }
  }
  prevPage() {
    if (this.clickedButton > 1) {
      this.changePage(this.clickedButton - 1)
    }
  }
  nextPage() {
    if (this.clickedButton < this.totalPages) {
      this.changePage(this.clickedButton + 1)
    }
  }
  ngOnDestroy(): void {
    this.currentPageSubscription.unsubscribe()
    this.totalPagesSubscription.unsubscribe()
  }
}
