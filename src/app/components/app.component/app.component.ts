import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'ment',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "Courses";
  constructor(private authService: AuthService,  private ref: ChangeDetectorRef) {
  }
}
