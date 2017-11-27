import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy  } from '@angular/core';
import { ICourse } from '../../typings/course.component.d';

@Component({
  selector: 'ment-course',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})

export class CourseComponent {
  @Input() courseItem: ICourse;
  @Output() deleteCourse: EventEmitter<string> = new EventEmitter<string>();
  contructor () {
  }
  onDeleteCourse(): void {
    this.deleteCourse.emit(this.courseItem.id);
  }
}
