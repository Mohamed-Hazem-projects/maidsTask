import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[Drag]',
  standalone: true
})
export class DragDirective {

  //this directive is to drag the parent of a child using that child

  elX: number; initialX: number; currentX: number;
  elY: number; initialY: number; currentY: number;
  elParent: ElementRef; dragging: Boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.elX = 0; this.initialX = 0; this.currentX = 0;
    this.elY = 0; this.initialY = 0; this.currentY = 0;
    this.elParent = this.renderer.parentNode(this.el.nativeElement);
    this.dragging = false;
  }

  @HostListener("mousedown", ["$event"])
  DragStart(event: MouseEvent) {
    event.preventDefault()
    this.dragging = true;
    this.initialX = event.x
    this.initialY = event.y
    this.elX = this.el.nativeElement.getBoundingClientRect().x
    this.elY = this.el.nativeElement.getBoundingClientRect().y
    this.renderer.setStyle(this.elParent, 'top', '0')
    this.renderer.setStyle(this.elParent, 'left', '0')
    this.renderer.setStyle(this.elParent,
      'transform', `translate(${this.elX}px,${this.elY}px)`)
  }

  @HostListener("mousemove", ["$event"])
  Drag(event: MouseEvent) {
    event.preventDefault()
    if (this.dragging) {
      this.currentX = this.elX + event.x - this.initialX
      this.currentY = this.elY + event.y - this.initialY
      this.renderer.setStyle(this.elParent,
        'transform', `translate(${this.currentX}px,${this.currentY}px)`)
    }
  }

  @HostListener("mouseup", ["$event"])
  DragEnd(event: MouseEvent) {
    event.preventDefault()
    this.dragging = false;
  }

  @HostListener("touchstart", ["$event"])
  DragTouchStart(event: TouchEvent) {
    this.dragging = true;
    this.initialX = event.touches[0].clientX
    this.initialY = event.touches[0].clientY
    this.elX = this.el.nativeElement.getBoundingClientRect().x
    this.elY = this.el.nativeElement.getBoundingClientRect().y
    this.renderer.setStyle(this.elParent, 'top', '0')
    this.renderer.setStyle(this.elParent, 'left', '0')
    this.renderer.setStyle(this.elParent,
      'transform', `translate(${this.elX}px,${this.elY}px)`)
  }

  @HostListener("touchmove", ["$event"])
  DragTouch(event: TouchEvent) {
    event.preventDefault()
    if (this.dragging) {
      this.currentX = this.elX + event.touches[0].clientX - this.initialX
      this.currentY = this.elY + event.touches[0].clientY - this.initialY
      this.renderer.setStyle(this.elParent,
        'transform', `translate(${this.currentX}px,${this.currentY}px)`)
    }
  }

  @HostListener("touchend", ["$event"])
  DragTouchEnd(event: TouchEvent) {
    this.dragging = false;
  }
}
