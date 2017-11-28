import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { BorderDirective } from './border.directive';
import {Component, OnInit} from '@angular/core';
import {ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FlexLayoutModule,
  MatchMedia,
  BreakPointRegistry
} from '@angular/flex-layout';

describe('layout directive', () => {
  
    beforeEach(() => {
  
      // Configure testbed to prepare services
      TestBed.configureTestingModule({
        imports: [FlexLayoutModule],
        declarations: [TestLayoutComponent, BorderDirective],
        providers: [
          BreakPointRegistry
        ]
      })
    });
  
    it('should add correct border style for default', () => {
      let template = '<div [courseBorder]="date">132</div>';
      let fixture = createTestComponent(template);
      let el = fixture.debugElement.children[0].nativeElement;

      fixture.detectChanges();

      expect(el.style['border']).toBe('1px solid black');
    });
    
  
  });

  @Component({
    selector: 'test-layout',
    template: `<span>PlaceHolder HTML to be Replaced</span>`
  })
  export class TestLayoutComponent implements OnInit {
    public date: string = '11.11.2017';
    constructor() { }
    ngOnInit() { }
  }
  
 
  function createTestComponent(template: string): ComponentFixture<TestLayoutComponent>
  {
    return TestBed
      .overrideComponent(TestLayoutComponent, {set: {template: template}} )
      .createComponent(TestLayoutComponent);
  }
