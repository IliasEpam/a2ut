import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { SpinnerService } from './spinner.service';
import { Http, Response, Request, RequestOptions, Headers, RequestMethod, URLSearchParams} from '@angular/http';
import { loginReducer, LOGIN, LOGOUT } from '../reducers/login.reducer';
import { usernameReducer, USERNAME } from '../reducers/username.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthService {
    private storageKey: string = 'ment';
    public isAuthFormVisible: boolean = false;

    private isUserAuth: Observable<boolean>;

    private baseUrl = "http://localhost:3000";

    constructor(private spinnerService: SpinnerService, private http: Http, private router: Router, private store: Store<any>) {
        this.isUserAuth = this.store.select('isLoggedIn');
    }
    ngOnInit(){
    }

    isAuth(): Observable<boolean>{
        return this.isUserAuth;
    }

    login(data: any): any {
        this.spinnerService.showSpinner();
        let body = {"login": data.login};
        let url: string = this.baseUrl + '/login';
        let sub = this.loginOnServer(url, body)
        .subscribe(
            (res) => {
                setTimeout(() => {
                    this.afterLogin(body);
                    this.store.dispatch({type: LOGIN});
                    this.router.navigate(['/courses']);
                }, 1000);
            },
            ()=>{},
            ()=>{sub.unsubscribe()}
        );
    }

    afterLogin(body: any): void {
        this.setUserInfo(body);
        localStorage.setItem(this.storageKey, JSON.stringify("some-token"));
        this.spinnerService.hideSpinner();
    }

    loginOnServer(url: string, body: any): Observable<any> {
        return this.http.post(url, body);
    }

    logout(): void {
        this.spinnerService.showSpinner();
        let url: string = this.baseUrl + '/login';
        let sub = this.logoutOnServer(url)
        .subscribe(
            (res) => {
                setTimeout(() => {
                    this.store.dispatch({type: LOGOUT});
                    this.afterLogout();
                }, 1000);
            },
            ()=>{},
            ()=>{sub.unsubscribe()}
    );
        
    }
    
    afterLogout(): void {
        localStorage.removeItem(this.storageKey);
        this.spinnerService.hideSpinner();
    }

    logoutOnServer(url: string): Observable<any> {
        let body = {
            login: JSON.parse(localStorage.getItem(this.storageKey + '-login'))
        };
        return this.http.post(url, body);
    }

    setUserInfo(info: any): void {
        localStorage.setItem(this.storageKey + '-login', JSON.stringify(info.login));
        this.store.dispatch({type: USERNAME, payload: info.login});
    }
}