import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConditionalRenderComponentService {
  $showComponent=new BehaviorSubject('lists');
  $showTable=new BehaviorSubject('lists');
  constructor() { }
  changeComponent(componentName:string){
    console.log(componentName);
    this.$showComponent.next(componentName);
  }

}
