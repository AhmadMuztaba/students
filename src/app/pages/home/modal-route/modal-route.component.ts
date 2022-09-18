import { Component, OnInit,OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-modal-route',
  templateUrl: './modal-route.component.html',
  styleUrls: ['./modal-route.component.scss']
})
export class ModalRouteComponent implements OnInit,OnDestroy{
  destroy=new Subject<any>();
  private currentDialog:MatDialogRef<any>|null=null
  constructor(private matDialog:MatDialog,private route:ActivatedRoute,private router:Router) {
    route.params.pipe(takeUntil(this.destroy)).subscribe(params=>{
      if(this.currentDialog){
        this.currentDialog.close();
      }
      this.currentDialog=matDialog.open(DetailsComponent,{
        data:{
          id:params['id']
        }
      });
      this.currentDialog.afterClosed().subscribe(result=>{
        console.log(result);
        router.navigateByUrl('/');
      })
    })
  }

  ngOnInit(): void {
  }
  ngOnDestroy(){
    this.destroy.next('');
  }

}
