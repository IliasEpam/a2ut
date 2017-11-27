import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, NG_VALIDATORS } from '@angular/forms';

export function dateInputValidator() {
    return (control: FormControl) => {
      let err = {
        error: {
          invalid: true
        }
      };
      let isValid;
      let regexp = /\d{2}[.]\d{2}[.]\d{4}$/;
      if (!control.value || !regexp.test(control.value)) {
        isValid = false;
      } else {
          isValid = true;
      }
    return isValid ? null: err;
    }
  }

@Component({
  selector: 'ment-form-dateinput',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './dateinput.component.html',
  styleUrls: ['./dateinput.component.scss'],
  providers: [
    { 
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DateInputComponent),
        multi: true
    },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateInputComponent), multi: true }
  ],
  host: {
    class: 'date-input'
  }
})

export class DateInputComponent implements ControlValueAccessor {
  @Input('nameOption') inputName: string;

  propagateChange = (_: any) => {};
  validateFn:any = () => {};
  
  currentValue: string;

  ngOnChanges(inputs: any) {
    this.validateFn = dateInputValidator();
    this.propagateChange(this.currentValue);
  }

  onChange(event:any) {
    this.writeValue(event.target.value);
    this.propagateChange(event.target.value);
  }

  writeValue(value: string) {
    if (value) {
      this.currentValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  validate(c: FormControl) {
    return this.validateFn(c);
  }
}
