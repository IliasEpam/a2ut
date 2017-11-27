import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { SearchPipe } from '../../pipes/search.pipe';
import { ICourse } from '../../typings/course.component.d';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'ment-breadcrumbs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})

export class BreadcrumbsComponent { 
  public items: string[] = ['courses'];
  public sub: Subscription;

  constructor(private coursesService: CoursesService, 
    private ref: ChangeDetectorRef){ }

  ngOnInit(){
    let sub = this.coursesService.bsStream$.subscribe((bsItem) =>{
      console.log(bsItem);
      if (bsItem) {
        this.items[1] = bsItem;
      } else if (this.items[1] && !bsItem) {
        this.items.splice(1, 1);
      }

      this.ref.markForCheck();
    })
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }
}
