import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ment-loginpage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})

export class LoginPageComponent {
  private login: string;
  private password: string;

  constructor(private authService: AuthService, private router: Router) {

  }

  public auth() {
    let authData = {
      login: this.login
    }
    this.authService.login(authData);
  }
 }
