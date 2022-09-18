import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommunicationServiceService } from 'src/app/@services/communication-service.service';
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
  id:string='';
  form:FormGroup|any;
  readOnly:boolean=false;
  data:student[]=[];
  selectedData:student|undefined;
  constructor(private route:ActivatedRoute,private conditionalRenderService:ConditionalRenderComponentService,private communicationService:CommunicationServiceService) {
    
  }



  ngOnInit(): void {
    this.formBuild();
    this.route.params.subscribe(params=>{
      if(params['id']){
        this.conditionalRenderService.changeComponent('');
      }
      this.id=params['id'];
      this.selectData();
      
    })
  }

  selectData(){
    if(this.id){
      this.readOnly=true;
      this.data=this.getLocalStorageData('students');
      console.log(this.data);
      this.selectedData=this.data.find(student=>student.id==this.id);
      console.log(this.selectedData);
      this.formBuild();
    }
  }
  formBuild(){
    this.form=new FormGroup({
      id:new FormControl(this.selectedData?.id||uuidv4()),
      name:new FormControl(this.selectedData?.name||'',Validators.required),
      profession:new FormControl(this.selectedData?.profession||''),
      email:new FormControl(this.selectedData?.email||'',[Validators.required,Validators.email]),
      phone:new FormControl(this.selectedData?.phone||''),
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
      this.communicationService.saveToLocalStorage();
      this.form.reset();
      this.form.controls['name'].setErrors(null);
      this.form.controls['email'].setErrors(null);
    }
  }

}
