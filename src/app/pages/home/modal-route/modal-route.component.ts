import { Component, OnInit,OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CommunicationServiceService } from 'src/app/@services/communication-service.service';
import { student } from 'src/app/models/student';
import Swal from 'sweetalert2';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-modal-route',
  templateUrl: './modal-route.component.html',
  styleUrls: ['./modal-route.component.scss']
})
export class ModalRouteComponent implements OnInit,OnDestroy{
  destroy=new Subject<any>();
  private currentDialog:MatDialogRef<any>|null=null;
  routeUnsubscribe;
  constructor(private matDialog:MatDialog,private route:ActivatedRoute,private router:Router,private communicationService:CommunicationServiceService) {
    // pipe(takeUntil(this.destroy))
    this.routeUnsubscribe=route.params.subscribe(params=>{
      // if(this.currentDialog){
      //   this.currentDialog.close();
      // }
      this.currentDialog=matDialog.open(DetailsComponent,{
        data:{
          id:params['id']
        }
      });
      this.currentDialog.afterClosed().subscribe(result=>{
        router.navigateByUrl('/');
        if(result){
          let data:student[]=this.getLocalStorageData('students');
          data=data.map((student)=>{
            if(student.id==result.id){
              return result;
            }else{
              return student;
            }
          })
          console.log(data);
          this.saveToLocalStorage('students',data);
          this.communicationService.saveToLocalStorage();
          Swal.fire(
            'Good job!',
            'Updated!',
            'success'
          )
        }
        
      })
    })
  }

  saveToLocalStorage(key:string,value:student[]){
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

  ngOnInit(): void {
  }
  ngOnDestroy(){
    this.routeUnsubscribe.unsubscribe();
  }

}
