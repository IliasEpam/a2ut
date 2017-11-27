import { Component, Output, OnInit, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { durationValidator } from '../duration.component';
import { dateInputValidator } from '../dateinput.component';
import { authorsInputValidator } from '../authorsinput.component';
import { CoursesService } from '../../services/courses.service';
import { SpinnerService } from '../../services/spinner.service';
import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { } from 'jasmine';
import 'rxjs/Rx';
import { HttpService } from '../../services/http.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from "@angular/forms";
import { AddCourseComponent } from './addcourse.component';
import { DurationComponent } from '../../components/duration.component';
import { DateInputComponent } from '../../components/dateinput.component';
import { AuthorsInputComponent } from '../../components/authorsinput.component';
import { FormatTimePipe } from '../../pipes/time.pipe';

class MockCoursesService {
  getAuthors(){
    return Observable.of(['author']);
  }
  updateCourse() {
    return Observable.of(true);
  }

  setBsItem(some: any): void {
  }
}

class MockActivatedRouter {
  private params: Observable<any> = Observable.of({data: Observable.of('param')});
}

class MockRouter {
  navigate(): void {

  }
}

describe('AddCourseComponent', () => {
  let coursesService: CoursesService;
  let spinnerService: SpinnerService;
  let fixture: ComponentFixture<AddCourseComponent>;
  let component: AddCourseComponent;
  let de: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule(
    { 
      imports: [ FormsModule,
        HttpModule,
        ReactiveFormsModule, ],
      declarations: [AddCourseComponent, DurationComponent, DateInputComponent, AuthorsInputComponent, FormatTimePipe],
      providers: [
        {provide: CoursesService, useClass: MockCoursesService},
        SpinnerService,
        HttpService,
        {provide: ActivatedRoute, useClass: MockActivatedRouter},
        {provide: Router, useClass: MockRouter}
      ]
    }
    );
    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    coursesService = TestBed.get(CoursesService);
    spinnerService = TestBed.get(SpinnerService);
  });

  it ('should work', () => {
    expect(component instanceof AddCourseComponent).toBe(true, 'should be created');
  });

  it ('spinner should be shown when submitting valid form', () => {
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(spinnerService, 'showSpinner');
    component.courseForm.controls['title'].setValue("title");
    component.courseForm.controls['description'].setValue("some descriprion");
    component.courseForm.controls['date'].setValue("12.12.2017");
    component.courseForm.controls['duration'].setValue("80");
    component.courseForm.controls['authors'].setValue(['author']);

    component.onsubmit(this.courseForm);

    expect(spinnerService.showSpinner).toHaveBeenCalled();
  });

  it ('form should be valid when it filled with valid data', () => {
    component.ngOnInit();
    fixture.detectChanges();
    component.courseForm.controls['title'].setValue("title");
    component.courseForm.controls['description'].setValue("some descriprion");
    component.courseForm.controls['date'].setValue("12.12.2017");
    component.courseForm.controls['duration'].setValue("80");
    component.courseForm.controls['authors'].setValue(['author']);

    expect(component.courseForm.valid).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component.ngOnInit();
    expect(component.courseForm.valid).toBeFalsy();
  });
});
