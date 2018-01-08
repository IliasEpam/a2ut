import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ment-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  public authForm: Subscription;
  public isLoggedInS: Subscription;
  public isLoggedIn: boolean;
  public isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private ref: ChangeDetectorRef, private store: Store<any>) {
    this.isLoggedIn$ = this.store.select('isLoggedIn');
  }

  ngOnInit() {
  }
}
