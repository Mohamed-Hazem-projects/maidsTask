import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-heading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-header.component.html',
  styleUrl: './my-header.component.scss'
})
export class MyHeaderComponent {
  @Input() progress!: number
}
