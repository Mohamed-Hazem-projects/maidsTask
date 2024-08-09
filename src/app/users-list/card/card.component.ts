import { Component, Input } from '@angular/core';
import { IUser } from '../../Models/user';
import { RouterLink } from '@angular/router';
import { CardHoverDirective } from '../../Directives/card-hover.directive';

@Component({
  selector: 'card',
  standalone: true,
  imports: [RouterLink, CardHoverDirective],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() User!: IUser;

}
