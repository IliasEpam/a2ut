import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ment-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  public username$: Observable<string>;

  constructor(private authService: AuthService, private ref: ChangeDetectorRef, private router: Router, private store: Store<any>) {
      this.username$ = this.store.select('username');
  }

  logof(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

 }
