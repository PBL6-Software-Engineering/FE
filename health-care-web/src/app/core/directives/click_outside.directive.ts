import {
  Directive,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  constructor(private elementRef: ElementRef) {}

  @Output() clickOutside = new EventEmitter<void>();

//   @HostListener('document:click', ['$event'])
//   onClick(event: Event): void {
//     if (!this.elementRef.nativeElement.contains(event.target)) {
//       console.log(this.elementRef.nativeElement);
//       console.log(event.target);
//       this.clickOutside.emit();
//     }
//   }
}
