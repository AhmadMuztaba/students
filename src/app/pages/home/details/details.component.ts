import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import * as moment from 'moment';
import { student } from 'src/app/models/student';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  form:any;
  mode: "create" | "update"| "read" = "create";
  allData:student[]=[];
  selectedData:student|undefined;
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
  private dialogRef: MatDialogRef<DetailsComponent>,) { }
  ngOnInit(): void {
    if(this.defaults){
      if(this.defaults.id){
          this.formBuild();
          this.allData=this.getLocalStorageData('students');
          this.selectedData=this.allData.find(student=>student.id==this.defaults.id);
          this.formBuild();
          this.mode='update';
      }
    }
    
  }
  getLocalStorageData(key:string){
    let data=localStorage.getItem(key);
    let parsedData=[];
    if(data){
      parsedData=JSON.parse(data);
    }
    return parsedData;
  }

  formBuild(){
    this.form=new FormGroup({
      id:new FormControl(this.selectedData?.id||''),
      name:new FormControl(this.selectedData?.name||'',Validators.required),
      phone:new FormControl(this.selectedData?.phone||'',[Validators.pattern("\^(01)[5-9][\d]{8}$")]),
      email:new FormControl(this.selectedData?.email||'',[Validators.required,Validators.email]),
      profession:new FormControl(this.selectedData?.profession||''),
      dob:new FormControl(moment(this.selectedData?.dob).format('YYYY-MM-DD')||''),
    })
  }
  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }
  save(){
    if(this.mode=='update'){
      this.create();
    }
    else if(this.mode=='create'){
      this.update();
    }
  }
  create(){
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }
  update(){
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }

}
