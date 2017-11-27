import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SpinnerService {
    private isSpinnerVisible: boolean;
    public spinnerStream = new Subject<any>();
    public spinnerStream$ = this.spinnerStream.asObservable();

   hideSpinner() {
       this.isSpinnerVisible = false;
       this.spinnerStream.next(this.isSpinnerVisible);
   }

   showSpinner() {
        this.isSpinnerVisible = true;
        this.spinnerStream.next(this.isSpinnerVisible);
    }
}