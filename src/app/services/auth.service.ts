import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { SpinnerService } from './spinner.service';
import { Http, Response, Request, RequestOptions, Headers, RequestMethod, URLSearchParams} from '@angular/http';

@Injectable()
export class AuthService {
    private storageKey: string = 'ment';
    public isAuthFormVisible: boolean = false;
    public authFormStream = new Subject<any>();
    public authFormStream$ = this.authFormStream.asObservable();

    public isAuthStream = new ReplaySubject<any>(1);
    public isAuthStream$ = this.isAuthStream.asObservable();

    private isUserAuth: boolean;
    public userInfoStream = new Subject<any>();
    public userInfoStream$ = this.userInfoStream.asObservable();
    private userInfo: any;
    private baseUrl = "http://localhost:3000";

    constructor(private spinnerService: SpinnerService, private http: Http, private router: Router) {

    }
    ngOnInit(){
        this.isUserAuthInitial();
    }
    toggleAuthForm(): void {
        this.isAuthFormVisible = !this.isAuthFormVisible;
        this.authFormStream.next(this.isAuthFormVisible);
    }

    isUserAuthInitial(): void {
        this.isUserAuth = !!JSON.parse(localStorage.getItem(this.storageKey));
        this.isAuthStream.next(this.isUserAuth);
    }

    isAuth(): boolean{
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
                    this.router.navigate(['/courses']);
                }, 1000);
            },
            ()=>{},
            ()=>{sub.unsubscribe()}
        );
    }

    afterLogin(body: any): void {
        this.isUserAuth = true;
        this.isAuthStream.next(this.isUserAuth);
        this.setUserInfo(body);
        this.getUserInfo()
        this.toggleAuthForm();
        localStorage.setItem(this.storageKey, JSON.stringify("some-token")); //or body.someToken
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
                    this.afterLogout();
                }, 1000);
            },
            ()=>{},
            ()=>{sub.unsubscribe()}
    );
        
    }
    
    afterLogout(): void {
        this.isUserAuth = false;
        this.isAuthStream.next(this.isUserAuth);
        localStorage.removeItem(this.storageKey);
        this.userInfoStream.next(null);
        this.spinnerService.hideSpinner();
    }

    logoutOnServer(url: string): Observable<any> {
        let body = {
            login: JSON.parse(localStorage.getItem(this.storageKey + '-login'))
        };
        return this.http.post(url, body);
    }

    setUserInfo(info: any): void {
        localStorage.setItem(this.storageKey + '-login', JSON.stringify(info));
        this.userInfo = info;
    }

    getUserInfo(): void {
        if (this.isUserAuth) {
            let userInfo = JSON.parse(localStorage.getItem(this.storageKey + '-login'));
            this.userInfoStream.next(userInfo.login);
        } else {
            this.userInfoStream.next(null);
        }
    }
}