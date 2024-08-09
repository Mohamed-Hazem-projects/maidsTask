import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ClickedOutsideDirective } from '../../Directives/clicked-outside.directive';
import { IUser } from '../../Models/user';
import { selectUserList } from '../../state/userList/usersList.selectors';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { loadUserList } from '../../state/userList/usersList.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'notifications',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ClickedOutsideDirective
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnDestroy {

  userList!: IUser[]
  barFlag: Boolean;
  delayBarFlag: Boolean;
  userListSubscription: Subscription;
  notificationData: { img: string; id: number; notification: string; date: string }[] = [];

  constructor(private store: Store) {
    //the next line is to insure users are loaded in the cache in case the page was
    // refreshed inside one of the user details pages
    this.store.dispatch(loadUserList({ pageNo: 1 }))

    //getting user data and initializing the notifications with them
    //unsubscribed manually
    this.userListSubscription = this.store.select(selectUserList).subscribe((userList) => {
      this.userList = userList.data;
      this.initializeNotifications();
    })

    //next section is closing/opening the notifications bar
    this.barFlag = false;
    this.delayBarFlag = false;
  }

  toggleBar() {
    this.barFlag = !this.barFlag;
    this.delayBarFlag = false;
  }

  hideBar() {
    this.delayBarFlag ? this.delayBarFlag = this.barFlag = false : this.delayBarFlag = true;
  }

  ngOnDestroy(): void {
    this.userListSubscription.unsubscribe()
  }
  //wrote some notifications manually using the API data
  initializeNotifications() {
    this.notificationData = [
      {
        img: this.userList[5]?.avatar, id: this.userList[5]?.id,
        notification: `${this.userList[5]?.first_name} invited you to follow Robotics-FCDS`,
        date: "2 Hours Ago"
      },
      {
        img: this.userList[1]?.avatar, id: this.userList[1]?.id,
        notification: `${this.userList[1]?.first_name} Wants to connect with you`,
        date: "4 Hours Ago"
      },
      {
        img: this.userList[2]?.avatar, id: this.userList[2]?.id,
        notification: `${this.userList[2]?.first_name} liked your post.`,
        date: "7 Hours Ago"
      },
      {
        img: this.userList[3]?.avatar, id: this.userList[3]?.id,
        notification: `${this.userList[3]?.first_name} Viewed your profile`,
        date: "12 Hours Ago"
      },
      {
        img: this.userList[5]?.avatar, id: this.userList[5]?.id,
        notification: `${this.userList[5]?.first_name} Wants to connect with you`,
        date: "15 Hours Ago"
      },
      {
        img: this.userList[1]?.avatar, id: this.userList[1]?.id,
        notification: `${this.userList[1]?.first_name} mentioned you in a comment`,
        date: "18 Hours Ago"
      },
      {
        img: this.userList[3]?.avatar, id: this.userList[3]?.id,
        notification: `${this.userList[3]?.first_name} invited you to a group.`,
        date: "1 Day Ago"
      },
      {
        img: this.userList[4]?.avatar, id: this.userList[4]?.id,
        notification: `Your post got 23 comments.`, date: "1 Day Ago"
      },
      {
        img: this.userList[4]?.avatar, id: this.userList[4]?.id,
        notification: `Your post got 192 likes.`, date: "1 Day Ago"
      },
      {
        img: this.userList[4]?.avatar, id: this.userList[4]?.id,
        notification: `Your post was uploaded.`, date: "1 Day Ago"
      }
    ];
  }
}
