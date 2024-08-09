import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserAPI } from '../Models/user-api';
import { IUserList } from '../Models/user-list';
import { catchError, Observable, of, retry, shareReplay, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GetDataService {

  private readonly CACHE_EXPIRATION = 10 * 60 * 1000; // 10 minutes to expire

  private userCache = new Map<number, { data: IUserAPI; expiration: number }>();
  private userListCache = new Map<number, { data: IUserList; expiration: number }>();

  constructor(private http: HttpClient) { }

  private isExpired(expiration: number): boolean {
    return Date.now() > expiration;
  }

  getUserByID(id: number): Observable<IUserAPI> {
    //If the id exist in the cache and has not expired yet get it from the cache
    if (this.userCache.has(id) && !this.isExpired(this.userCache.get(id)!.expiration)) {
      return of(this.userCache.get(id)!.data);
    }
    //if user doesn't exist in cache/has expired make a new HTTP request
    return this.http.get<IUserAPI>(`https://reqres.in/api/users/${id}`).pipe(
      retry(3),
      catchError(this.handleError),
      shareReplay(1),
      tap(data => {
        this.userCache.set(id, { data, expiration: Date.now() + this.CACHE_EXPIRATION });
      })
    );
  }

  getUserListPage(page: number): Observable<IUserList> {
    if (this.userListCache.has(page) && !this.isExpired(this.userListCache.get(page)!.expiration)) {
      return of(this.userListCache.get(page)!.data);
    }

    return this.http.get<IUserList>(`https://reqres.in/api/users?page=${page}`).pipe(
      retry(3),
      catchError(this.handleError),
      shareReplay(1),
      tap(data => {
        this.userListCache.set(page, { data, expiration: Date.now() + this.CACHE_EXPIRATION });
      })
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {

    //first line of defense against errors
    //handle the error in the service before sending it to the reducers to be handled again
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
