import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConditionalRenderComponentService } from 'src/app/@services/conditional-render-component.service';
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
  id:string='';
  readOnly:boolean=false;
  data:student[]=[];
  selectedData:student|undefined;
  constructor(private route:ActivatedRoute) {
    this.route.params.subscribe(params=>{
      this.id=params['id'];
      if(this.id){
        this.readOnly=true;
        this.data=this.getLocalStorageData('students');
        console.log(this.data);
        this.selectedData=this.data.find(student=>student.id==this.id);
        console.log(this.selectedData);
        this.formBuild(this.selectedData);
      }
    })
  }



  ngOnInit(): void {
    this.formBuild();
  }
  formBuild(data?:student){
    console.log(data);
    this.form=new FormGroup({
      id:new FormControl(uuidv4()),
      name:new FormControl(data?.name||'',Validators.required),
      profession:new FormControl(data?.profession||''),
      email:new FormControl(data?.email||'',[Validators.required,Validators.email]),
      phone:new FormControl(data?.phone||''),
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
