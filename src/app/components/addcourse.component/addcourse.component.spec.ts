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

}


describe('AddCourseComponent', () => {
  let coursesService: CoursesService;
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
      providers: [{provide: CoursesService, useClass: MockCoursesService}, SpinnerService, HttpService]
    }
    );
    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    coursesService = TestBed.get(CoursesService);
  });

  it ('should work', () => {
    expect(component instanceof AddCourseComponent).toBe(true, 'should be created');
  });
});
