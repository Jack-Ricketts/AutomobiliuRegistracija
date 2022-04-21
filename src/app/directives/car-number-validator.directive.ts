import { Directive } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[CarNumberValidator]',
  providers:[
    {
      provide:NG_VALIDATORS,
      useExisting:CarNumberValidatorDirective,
      multi:true
    }
  ]
})

export class CarNumberValidatorDirective implements Validator{

  constructor() { }
  validate(control: FormControl): ValidationErrors | null {
    let regNumber : string=control.value;
    let pattern :RegExp= /^[a-z|A-Z]{3}[0-9]{3}$/;
    if ( ! pattern.test(regNumber)){
      return {'error':'Klaida'};
    }
    return null;
  }
}