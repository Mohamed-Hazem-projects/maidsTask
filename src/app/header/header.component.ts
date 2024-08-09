import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { DarkModeComponent } from './dark-mode/dark-mode.component';
import { NotificationsComponent } from './notifications/notifications.component';

@Component({
  selector: 'my-header',
  standalone: true,
  imports: [
    SearchComponent,
    RouterLink,
    CommonModule,
    DarkModeComponent,
    NotificationsComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
