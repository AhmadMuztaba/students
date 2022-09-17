import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form:FormGroup|any;
  constructor() { }

  ngOnInit(): void {
    this.form=new FormGroup({
      name:new FormControl('',Validators.required),
      profession:new FormControl(''),
    })
  }

  submit(){
    if(this.form?.valid){
      console.log(this.form.value);
    }
  }

}
