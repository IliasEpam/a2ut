import { Component, Output, OnInit, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { durationValidator } from '../duration.component';
import { dateInputValidator } from '../dateinput.component';
import { authorsInputValidator } from '../authorsinput.component';
import { CoursesService } from '../../services/courses.service';
import { SpinnerService } from '../../services/spinner.service';


@Component({
  selector: 'ment-addcourse',
  templateUrl: './addcourse.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./addcourse.component.scss']
})

export class AddCourseComponent implements OnInit {    
  courseForm: FormGroup;
  duration: string = 'duration';
  date: string = 'date';
  authorsName: string = 'authors';
  authorsList: [string];
  initialDate: string;
  initialDuration: string;
  dataBuffer: any;

  constructor(
    private formBuilder: FormBuilder, 
    private coursesService: CoursesService,
    private router: ActivatedRoute,
    private navigation: Router,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit() {
    let sub = this.coursesService.getAuthors().subscribe(
      (authors:[string]) => { this.authorsList = authors; },
      ()=>{},
      ()=>{sub.unsubscribe()}
    );
    this.router.params.subscribe((data) => {
      if (data.id) {
        this.coursesService.getCourse(data.id).subscribe((courseData) => {
          this.spinnerService.hideSpinner();
          this.courseForm.setValue({
            title: courseData.title,
            description: courseData.description,
            date: courseData.date,
            duration: courseData.duration,
            authors: courseData.authors
          });
          this.dataBuffer = courseData;
          this.coursesService.setBsItem(courseData.title);
        });
      }
    });
    this.courseForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      date: ['', dateInputValidator()],
      duration: ['', durationValidator()],
      authors: [[], authorsInputValidator()]
    });
  }

  onsubmit(form: any) {
    this.spinnerService.showSpinner();
    let id = '';
    let isFavorite = false
    if (this.dataBuffer && this.dataBuffer.id){
      id = this.dataBuffer.id;
      isFavorite = this.dataBuffer.isFavorite;
    }
    this.updateCourse(id, isFavorite);
  };

  updateCourse(id: string, isFavorite: boolean): void{
    const newCourseData = {
      id: id,
      title: this.courseForm.controls.title.value,
      duration: this.courseForm.controls.duration.value,
      date: this.courseForm.controls.date.value,
      description: this.courseForm.controls.description.value,
      isFavorite: isFavorite,
      authors: ["Author 1", "Author 2"]
    };
    this.coursesService.updateCourse(newCourseData).subscribe(()=>{}, ()=>{}, ()=>{
      this.goToMain();
      this.spinnerService.hideSpinner();
    });
  }

  goToMain() {
    this.navigation.navigate(['/']);
  }

  ngOnDestroy() {
    this.coursesService.setBsItem(null);
  }
}
