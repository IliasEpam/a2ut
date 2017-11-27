import { Injectable } from '@angular/core';
import { ICourse } from '../typings/course.component.d';
import { Observable, Observer, Subject, Subscription } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { HttpService } from './http.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CoursesService {
    private baseUrl: string = "http://localhost:3000";

    public coursesUpdateStream = new Subject<boolean>();
    public coursesUpdateStream$ = this.coursesUpdateStream.asObservable();
    public coursesUpdateSub: Subscription;
    private searchParam: string;

    public coursesStream = new Subject<ICourse[]>();
    public coursesStream$ = this.coursesStream.asObservable();

    public bsStream = new Subject<string>();
    public bsStream$ = this.bsStream.asObservable();

    private coursesPage: number = 1;

    constructor(private spinnerService: SpinnerService, private http: HttpService) {
        this.coursesUpdateSub = this.coursesUpdateStream$.subscribe(
            () => {
                let sub = this.getCourses()
                .subscribe(
                    (courses) => { 
                        setTimeout(
                            ( )=>{ this.coursesStream.next(courses); },
                            1000
                        ) },
                    ()=>{ },
                    ()=>{ sub.unsubscribe(); }
                )
            }
        )
    }

    setBsItem(item: string): void{
        this.bsStream.next(item);
    }

    getCourses() {
        this.spinnerService.showSpinner();
        let url = this.baseUrl + '/courses?update=1&page=' + this.coursesPage;
        if (this.searchParam) {
            url+='&search=' + this.searchParam;
        }
        return this.http.get(url).map((res) => res.json());
    }
    updateCourse(data: any) {
        let url = this.baseUrl + '/updatecourse';
        return this.http.post(url, data);
    }

    getCourse(id: string): Observable<any> {
        this.spinnerService.showSpinner();
        let url = this.baseUrl + '/course?id=' + id;
        return this.http.get(url).map((res) => res.json());
    }

    getAuthors() {
        let url = this.baseUrl + '/authors';
        return this.http.get(url).map((res) => res.json());
    }

    deleteCourse(id: string): Observable<any> {
        this.spinnerService.showSpinner();
        let url = this.baseUrl + '/courses?courseId=' + id;
        return this.http.delete(url);
    }
    
    broadcastSearchParam(param: string) {
        this.searchParam = param;
        this.initiateCoursesUpdate();
    }

    initiateCoursesUpdate() {
        this.coursesUpdateStream.next();
    }

    getMoreCourses(): void {
        ++this.coursesPage;
        this.initiateCoursesUpdate();
    }

    resetCoursesParams() {
        this.coursesPage = 1;
        this.searchParam = '';
    }    
}