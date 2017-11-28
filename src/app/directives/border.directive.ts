import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({ selector: '[courseBorder]' })
export class BorderDirective {
  @Input('courseBorder') createdDate: string;
  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    let currentDate: number = new Date().getTime();
    let createdDate: number = this.dateToNumber(this.createdDate);
    if (createdDate < currentDate && createdDate >= currentDate - 14*24*60*60*1000) {
      this.el.nativeElement.style.border = '1px solid green';
    } else if (createdDate > currentDate) {
      this.el.nativeElement.style.border = '1px solid blue';
    } else {
      this.el.nativeElement.style.border = '1px solid black';
    }
  }

  private dateToNumber(date: string): number {
    let month = date.slice(0,2);
    let day = date.slice(3,5);
    let year = date.slice(6);
    let newDate: number = new Date(month + '.' + day + '.' + year).getTime();
    return newDate;
  }
}
