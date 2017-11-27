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
  public isAuthVisible: boolean;
  public authForm: Subscription;
  title = "Courses";
  constructor(private authService: AuthService,  private ref: ChangeDetectorRef) {
    this.authForm = authService.authFormStream$.subscribe(
      isAuthVisible => {
        this.isAuthVisible = isAuthVisible;
        this.ref.markForCheck();
      });
  }

  ngOnDestroy() {
    this.authForm.unsubscribe();
  }
}
