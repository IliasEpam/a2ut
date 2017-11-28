import { Injectable } from '@angular/core';
import { ICourse } from '../typings/course.component.d';
import { Observable, Observer, Subject, Subscription } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { CoursesService } from './courses.service';
import { HttpService } from './http.service';
import 'rxjs/add/operator/map';
import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend, MockConnection  } from '@angular/http/testing';

describe('CoursesService', () => {
  let testingService: CoursesService = null;
  let spinnerService: SpinnerService = null;
  let backend: MockBackend = null;
  
  beforeEach(() => {
    TestBed.configureTestingModule(
    { 
      imports: [ ],
      declarations: [ ],
      providers: [ SpinnerService, {provide: HttpService, useClass: MockBackend}, CoursesService ]
    }
    );
  });
  beforeEach(inject([SpinnerService, HttpService, CoursesService], (spinnerService: SpinnerService, http: MockBackend, coursesService: CoursesService) => {

    testingService = coursesService;
    backend = http;
  }));
  
  it('should set bs item', () => {
    let testingItem = 'next';
    spyOn(testingService.bsStream, 'next');

    testingService.setBsItem(testingItem);

    expect(testingService.bsStream.next).toHaveBeenCalledWith(testingItem);
  });

  it('should set bs item', () => {
    testingService.coursesPage = 12;
    testingService.searchParam = '123123';

    testingService.resetCoursesParams();

    expect(testingService.coursesPage).toBe(1);
    expect(testingService.searchParam).toBe('');
  });

});
