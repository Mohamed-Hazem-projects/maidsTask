import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { catchError, Observable, of, Subscription, tap } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loadUserList } from '../state/userList/usersList.actions';
import { selectError, selectStatus, selectUserByID, selectUserList } from '../state/userList/usersList.selectors';
import { Store } from '@ngrx/store';
import { IUserAPI } from '../Models/user-api';
import { IUser } from '../Models/user';
import { MyHeaderComponent } from './heading/my-header.component';
import { PaginationComponent } from './pagination/pagination.component';

@Component({
  selector: 'users-list',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    MatProgressBarModule,
    MyHeaderComponent,
    PaginationComponent
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit, OnDestroy {

  userList$!: Observable<{ data: IUser[] } | null>;
  searchedUser$!: Observable<IUserAPI | null>;
  status$!: Observable<'pending' | 'loading' | 'error' | 'success'>;
  error$!: Observable<string | null>;
  errorSubscription!: Subscription;

  constructor(
    private _snackBar: MatSnackBar,
    private store: Store
  ) { }

  ngOnInit(): void {

    this.store.dispatch(loadUserList({ pageNo: 1 }))
    this.userList$ = this.store.select(selectUserList)
    this.searchedUser$ = this.store.select(selectUserByID)
    this.status$ = this.store.select(selectStatus)
    this.handleErrors()

  }

  private handleErrors() {
    this.errorSubscription = this.store.select(selectError).pipe(
      tap(error => {
        if (error) {
          this._snackBar.open(error, '', { duration: 6000 });
        }
      }),
      //last line of defense if the error didn't get handled in the service,reducers
      catchError(err => {
        this._snackBar.open('An unexpected error occurred', '', { duration: 6000 });
        return of(null);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe()
  }

}
