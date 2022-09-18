import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { student } from 'src/app/models/student';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
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
      id:new FormControl(uuidv4()),
      name:new FormControl('',Validators.required),
      profession:new FormControl(''),
      email:new FormControl('',[Validators.required,Validators.email]),
      phone:new FormControl(''),
    })
  }
  saveToLocalStorage(key:string,value:student){
    localStorage.setItem(key,JSON.stringify(value));
  }
  getLocalStorageData(key:string){
    let data=localStorage.getItem(key);
    let parsedData=[];
    if(data){
      parsedData=JSON.parse(data);
    }
    return parsedData;
  }
  submit(){
    if(this.form?.valid){
      console.log(this.form.value);
      let data=this.getLocalStorageData('students');
      data.push(this.form.value);
      this.saveToLocalStorage('students',data);
      Swal.fire(
        'Good job!',
        'Data added!',
        'success'
      )
     
      this.form.reset();
      this.form.controls['name'].setErrors(null);
      this.form.controls['email'].setErrors(null);
    }
  }

}
