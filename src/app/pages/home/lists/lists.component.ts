import { AfterViewInit, Component, ViewChild,OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource } from '@angular/material/table';
import {Router } from '@angular/router';
import * as moment from 'moment';
import { CommunicationServiceService } from 'src/app/@services/communication-service.service';
import { ConditionalRenderComponentService } from 'src/app/@services/conditional-render-component.service';
import { student } from 'src/app/models/student';
import Swal from 'sweetalert2';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit,OnDestroy{
  dataSource!: MatTableDataSource<student>;
  students:student[]=[];
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  dataUnsubscribe:any;
  columns=['id','name','DOB','email','phone','profession','actions'];
  @ViewChild(MatSort,{static:true}) sort!:MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator!:MatPaginator;
  constructor(private router:Router,private dialog:MatDialog,private conditionalRenderService:ConditionalRenderComponentService,private communicationService:CommunicationServiceService){
        
  }
  ngOnInit(): void {
    this.dataUnsubscribe=this.communicationService.$data.subscribe({
      next:(data)=>{
        this.tableInitilize(data);
      },error:(err)=>{
        console.log(err);
      }
    })
    this.tableInitilize(this.getLocalStorageData('students'));
  }
  tableInitilize(data:student[]){
        this.students=data;
        this.dataSource=new MatTableDataSource(this.students);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
  }
  getLocalStorageData(key:string){
    let data=localStorage.getItem(key);
    let parsedData=[];
    if(data){
      parsedData=JSON.parse(data);
    }
    return parsedData;
  }
  saveToLocalStorage(key:string,value:student){
    localStorage.setItem(key,JSON.stringify(value));
  }
  applyFilter(event:any){
    if(event.target.value.length>2||event.target.value==''){
      this.dataSource.filter=(event.target as HTMLInputElement).value.trim().toLowerCase();
    }
    
  }
  searchByDate(event:any){
    this.dataSource.filter=new Date(event.value).toISOString();
  }

  dateFormat(date:string){
    return moment(date).format('DD-MM-YYYY');
  }
  handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.students.slice(start, end);
    this.dataSource = new MatTableDataSource(part);
  }
  show(data:any){
    this.dialog.open(DetailsComponent,{
      data:data
    }).afterClosed().subscribe((data)=>{
      if(data){
        console.log(data);
      }
    })
  }
  delete(id:string){
    Swal.fire({
      title: `Are you sure you want to delete with id ${id}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        let data=this.getLocalStorageData('students');
        data=data.filter((student:student)=>student.id!=id);
        this.saveToLocalStorage('students',data);
        this.communicationService.saveToLocalStorage();
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  showForm(){
    this.conditionalRenderService.changeComponent('');
  }
  ngOnDestroy(): void {
    this.dataUnsubscribe.unsubscribe();
  }
}
