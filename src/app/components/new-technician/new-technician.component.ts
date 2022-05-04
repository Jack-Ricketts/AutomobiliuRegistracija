import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { TechnitianService } from 'src/app/services/technitian.service';

@Component({
  selector: 'app-new-technician',
  templateUrl: './new-technician.component.html',
  styleUrls: ['./new-technician.component.css'],
  animations: [
    trigger("blokelis",[
      state("pirma", style({
        'background-color':'green',
        transform:'translateX(0px)'
      })),
      state("antra", style({
        'background-color':'red',
        transform:'translateX(300px)'
      })),
      transition('pirma <=> antra',
      [
        animate(300, style({'background-color':'blue',  transform:'translateX(150px)'})),
        animate(300),
      ]),
    ]),
    trigger("errors",[
      state("normal", style({
        'background-color':'white',
        transform:'translateX(2000px)',
        'height':0
      })),
      state("error", style({
        'background-color':'#ffDDDD',
        transform:'translateX(0px)',
      })),
      transition('error => normal',
       [
         animate(1000,style({transform:'translateX(2000px)'})),
         animate(1000)
       ]
       ),
    ]),
    trigger("list",[
      state("in", style({
        'opacity':1,
        'height':24,
        transform: 'translateX(0px)'
      })),
      transition('void => *',
      [
        style({
          'opacity':0,
          'height':0,
          transform: 'translateX(-2000px)'
        }),
        animate(250,style({
          'opacity':0,
          'height':24,
          transform: 'translateX(-2000px)'
        })),
        animate(250)
      ]),
    ])
  ]
})
export class NewTechnicianComponent implements OnInit {

  busena="antra";
  formState="error";

  public technicianForm:FormGroup;
  
  constructor(private techService:TechnitianService) { 
    this.technicianForm=new FormGroup({
      'name':new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
      'surname':new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
      'level':new FormControl(null, [Validators.required, this.checkLevel]),
      'education':new FormArray([]),
      'address':new FormArray([])
    });
  }

  ngOnInit(): void {
    this.technicianForm.statusChanges.subscribe(()=>{
      if (this.technicianForm.valid){
        this.formState='normal';
      }else{
        this.formState='error';
      }
    });
  }

  onSubmit(){
    this.techService.addNewTechnician(this.technicianForm.value).subscribe(()=>{
      this.technicianForm.reset();
    })
   
  }

  checkLevel(control:FormControl): ValidationErrors|null {
    if (control.value=='1' || control.value=='3' || control.value=='5'){
      return null;
    }else{
      return {'levelIncorect':true}
    }
  }

  addEducation(){
    const input=new FormControl(null, Validators.required);
    (<FormArray>this.technicianForm.get('education')).push(input);
  }

  addAddress(){
    const address=new FormGroup({
      city:new FormControl(null, Validators.required, this.cityInDatabase()),
      street:new FormControl(null, Validators.required)
    });
    (<FormArray>this.technicianForm.get('address')).push(address);
  }

  get addresses(){
    return (<FormArray>this.technicianForm.get('address')).controls;
  }

  get educations(){
    return (<FormArray>this.technicianForm.get('education')).controls;
  }

  toFromGroup(el:AbstractControl):FormGroup{
    return <FormGroup>el;
  }

  cityInDatabase():AsyncValidatorFn{
    return (control:AbstractControl):Observable<ValidationErrors|null>=>{
      return this.techService.isCityAvailable(control.value).pipe( map((response)=>{
        if (response==true){
          return null;
        }else{
          return {"Miestas neegzistuoja DB":true};
        }
      }) );
    }
  }

  animuoti(){
    
  }
}