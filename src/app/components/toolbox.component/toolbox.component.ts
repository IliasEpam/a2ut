import { Component, Output, EventEmitter,ChangeDetectionStrategy } from '@angular/core';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'ment-toolbox',
  templateUrl: './toolbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./toolbox.component.scss']
})

export class ToolboxComponent {

  constructor(private coursesService: CoursesService){}

  public search: string = '';
  public startSearch(): void {
    this.coursesService.broadcastSearchParam(this.search);
  }
}
