import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[cardHoverDir]',
  standalone: true
})
export class CardHoverDirective {
  @HostBinding('class.card-hover') isHovering: boolean = false;

  @HostListener('mouseover') onMouseOver() {
    this.isHovering = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isHovering = false;
  }
}
