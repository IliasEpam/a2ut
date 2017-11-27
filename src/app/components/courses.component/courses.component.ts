import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { SearchPipe } from '../../pipes/search.pipe';
import { ICourse } from '../../typings/course.component.d';
import { Observable, Subscription } from 'rxjs';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'ment-courses',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit {
  public allCoursesSub: Subscription;
  public courses: ICourse[];
  public sortConfig: string = 'az';
  public sortOptions: any[] = [
    {name: 'Sort by date ↑', value: 'az'},
    {name: 'Sort by date ↓', value: 'za'}
  ];

  constructor(
    private coursesService: CoursesService, 
    private searchPipe: SearchPipe, 
    private ref: ChangeDetectorRef,
    private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.allCoursesSub = this.coursesService.coursesStream$.subscribe(
      (courses) => {
        this.courses = courses;
        this.ref.markForCheck();
        this.spinnerService.hideSpinner();
      }
    );
    this.coursesService.initiateCoursesUpdate();
  };

  onDeleteCourse(id: string): void {
    let confirmation = confirm('Do you really want to delete this course?');
    if (confirmation) {
      let sub = this.coursesService.deleteCourse(id).
      subscribe(() => {
        this.coursesService.initiateCoursesUpdate();
      },
      ()=>{},
      ()=>{sub.unsubscribe()});
    }
  }

  getMoreCourses(): void {
    this.coursesService.getMoreCourses();
  }

  isNoCourses(): boolean {
    return !this.courses || !this.courses.length;
  }

  public onSortingOption(e: any): void{
    this.sortConfig = e.target.value;
  }

  ngOnDestroy() {
    this.coursesService.resetCoursesParams();
    this.allCoursesSub.unsubscribe();
  }
}
