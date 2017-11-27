import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { } from 'jasmine';
import 'rxjs/Rx';
import { Observable, Observer, Subject, Subscription } from 'rxjs';
import { CoursesService } from '../../services/courses.service';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { SpinnerService } from '../../services/spinner.service';
import { HttpService } from '../../services/http.service';
import { HttpModule, Response, Request, RequestOptions, Headers, RequestMethod, URLSearchParams} from '@angular/http';

class MockCoursesService {
  public bsStream = new Subject<string>();
  public bsStream$ = this.bsStream.asObservable();

  setBsItem(item: string) {
    this.bsStream.next(item);
  }
}


describe('BreadcrumbsComponent', () => {
  let coursesService: CoursesService;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let component: BreadcrumbsComponent;
  let de: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule(
    { 
      imports: [ HttpModule ],
      declarations: [BreadcrumbsComponent],
      providers: [{provide: CoursesService, useClass: MockCoursesService}]
    }
    );
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    coursesService = TestBed.get(CoursesService);
  });

  it ('should work', () => {
    expect(component instanceof BreadcrumbsComponent).toBe(true, 'should be created');
  });

  it ('bs should be visible', () => {
    component.items[1] = 'someone';
    fixture.detectChanges();
    const el: HTMLElement = de.query(By.css('a')).nativeElement;

    expect(el.textContent).toEqual('courses');
  })

  it ('bs item should be displayed in template', () => {
    component.items[1] = 'bs item';
    fixture.detectChanges();
    const el: HTMLElement = de.query(By.css('.breadcrumbs__last')).nativeElement;

    expect(el.textContent).toEqual('bs item');
  })
});