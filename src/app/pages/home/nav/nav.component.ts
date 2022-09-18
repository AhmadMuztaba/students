import { Component,OnDestroy,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ConditionalRenderComponentService } from 'src/app/@services/conditional-render-component.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit,OnDestroy{
  conditionSubsription:any;
  showComponent:string='lists';
  hideList:boolean=false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private conditionalRenderService:ConditionalRenderComponentService,private router:Router,private route:ActivatedRoute) {
    if(this.router.url){
      if(this.router.url.split('/').length>1){
        this.hideList=true;
      }
    }
  }
  ngOnInit(): void {
    this.conditionSubsription=this.conditionalRenderService.$showComponent.subscribe({
      next:(data)=>{
        this.showComponent=data;
      },error:(err)=>{
        console.log(err);
      }
    })
  }
  render(componentName:string){
    this.conditionalRenderService.changeComponent(componentName);
  }

  ngOnDestroy(): void {
    this.conditionSubsription.unsubscribe();
  }
}
