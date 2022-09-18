import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  form:any;
  mode: "create" | "update"| "read" = "create";
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
  private dialogRef: MatDialogRef<DetailsComponent>,) { }
  ngOnInit(): void {
    this.form=new FormGroup({
      name:new FormControl(''),
      phone:new FormControl(''),
      email:new FormControl(''),
      profession:new FormControl('')
    })
  }
  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }
  save(){

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
