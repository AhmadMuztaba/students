import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class CommunicationServiceService {
  $data=new BehaviorSubject(this.getLocalStorageData('students'));

  saveToLocalStorage(){
    this.$data.next(this.getLocalStorageData('students'));
  }
  getLocalStorageData(key:string){
    let data=localStorage.getItem(key);
    let parsedData=[];
    if(data){
      parsedData=JSON.parse(data);
    }
    return parsedData;
  }
}
