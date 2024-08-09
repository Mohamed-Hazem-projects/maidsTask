import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { IUserAPI } from '../Models/user-api';
import { Store } from '@ngrx/store';
import { selectStatus, selectUserByID } from '../state/userList/usersList.selectors';
import { noSearch, searchByIDInit } from '../state/userList/usersList.actions';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBar,
    RouterLink
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  id!: number;
  idSubscription: Subscription;
  searchedUser$!: Observable<IUserAPI | null>;
  status$!: Observable<'pending' | 'loading' | 'error' | 'success'>;

  constructor(
    private activeRoute: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {
    this.idSubscription = this.activeRoute.params.pipe(map((p) => p['id']))
      .subscribe((id) => {
        this.id = id;
        this.store.dispatch(searchByIDInit({ ID: +this.id }))
      })
  }
  ngOnInit(): void {
    //will handle subscriptions using async pipe
    this.searchedUser$ = this.store.select(selectUserByID)
    this.status$ = this.store.select(selectStatus)
  }
  goBack() {

    //this.location.back();
    this.router.navigateByUrl('/Users')
  }
  ngOnDestroy(): void {

    this.idSubscription.unsubscribe()
    //to insure that the Users page is not affected
    this.store.dispatch(noSearch())
  }
}
