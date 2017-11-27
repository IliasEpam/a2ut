import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ment-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})

export class SpinnerComponent {
  public isVisible: boolean;
  public spinnerStream: Subscription;

  constructor(private spinnerService: SpinnerService, private ref: ChangeDetectorRef) {
    this.spinnerStream = spinnerService.spinnerStream$.subscribe(
      isVisible => {
        this.isVisible = isVisible;
        this.ref.markForCheck();
      });
  }
 }
