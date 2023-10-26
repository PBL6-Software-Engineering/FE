import {
  Directive,
  forwardRef,
  ElementRef,
  OnInit,
  Input,
  Output,
  OnDestroy,
  HostBinding,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import Cleave from 'cleave.js';

export const CURRENCY_MASK_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CurrencyDirective),
  multi: true,
};

@Directive({
  selector: '[ngCurrencyMask]',
  providers: [CURRENCY_MASK_VALUE_ACCESSOR],
  host: {
    '(blur)': 'onBlur($event)',
  },
})
export class CurrencyDirective
  implements OnInit, ControlValueAccessor, OnDestroy
{
  @HostBinding('disabled')
  @Input()
  disabled: boolean;
  @Input() value: string;
  @Input() options: any = {
    numeral: true,
    numeralIntegerScale: 100,
  };

  @Output() onValueChanged = new EventEmitter<any>();

  private onModelChange: Function = () => {};
  private onModelTouched: Function = () => {};
  private _instance: Cleave | null;
  constructor(public elRef: ElementRef) {}

  ngOnInit() {
    this.init();
  }

  ngOnChanges() {
    this.init();
  }

  private init() {
    if (this._instance) {
      this._instance.destroy();
      this._instance = null;
    }

    this._instance = new Cleave(this.elRef.nativeElement, {
      ...this.options,
      onValueChanged: (e: any) => {
        this.value = e.target.rawValue;
        this.onModelChange(this.value);
        this.onValueChanged.next(e);
      },
    });
    this._instance.setRawValue(this.value);
  }

  onBlur() {
    this.onModelTouched(true);
  }

  ngOnDestroy() {
    if (this._instance) {
      this._instance.destroy();
    }
    this._instance = null;
  }

  // implement ControlValueAccessor
  writeValue(obj: any): void {
    this.value = obj;
    if (this._instance) {
      this._instance.setRawValue(this.value);
    }
  }
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
