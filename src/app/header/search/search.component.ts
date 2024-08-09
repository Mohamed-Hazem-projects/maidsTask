import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { noSearch, searchByIDInit } from '../../state/userList/usersList.actions';
import { selectTotalUsers } from '../../state/userList/usersList.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnDestroy {

  search: string;
  noOfUsers!: number;
  totalUsersSubscription: Subscription;

  constructor(private store: Store, private _snackBar: MatSnackBar,) {
    this.search = "";
    this.totalUsersSubscription = this.store.select(selectTotalUsers)
      .subscribe((noOfUsers) => { this.noOfUsers = noOfUsers; })
  }

  Search() {
    //clear the searchedUser state so that search results disappear when string is empty
    if (this.search == "") {
      this.store.dispatch(noSearch())
    }
    //handled these two errors here instead of getting a HTTP error
    else if (!+this.search) {
      this._snackBar.open('ID must be a number.', 'X', { duration: 5000, panelClass: 'snackbar-error' });
    }
    else if (+this.search > this.noOfUsers) {
      this._snackBar.open(`ID can\'t be bigger than ${this.noOfUsers}`, 'X', { duration: 5000, panelClass: 'snackbar-error' });
    }
    else {
      this.store.dispatch(searchByIDInit({ ID: +this.search }))
      this._snackBar.dismiss()
    }
  }
  ngOnDestroy(): void {
    this.totalUsersSubscription.unsubscribe()
  }
}
