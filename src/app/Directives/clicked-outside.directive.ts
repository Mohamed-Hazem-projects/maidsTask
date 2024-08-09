import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[clickedOutside]',
  standalone: true
})
export class ClickedOutsideDirective {
  //main purpose:close the component when clicked outside it

  constructor(private element: ElementRef) { }
  @Output()
  clickedOutside: EventEmitter<void> = new EventEmitter();

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: PointerEvent) {
    const nativeElement = this.element.nativeElement;
    const clickedInside: boolean = nativeElement.contains(event.target);
    if (!clickedInside) {
      this.clickedOutside.emit();
    }
  }

}
