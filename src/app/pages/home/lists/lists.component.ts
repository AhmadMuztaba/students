import { AfterViewInit, Component, ViewChild,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource } from '@angular/material/table';
import {Router } from '@angular/router';
import { CommunicationServiceService } from 'src/app/@services/communication-service.service';
import { ConditionalRenderComponentService } from 'src/app/@services/conditional-render-component.service';
import { student } from 'src/app/models/student';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit{
  dataSource!: MatTableDataSource<student>;
  students:student[]=[];
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  columns=['id','name','email','phone','profession','actions'];
  @ViewChild(MatSort,{static:true}) sort!:MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator!:MatPaginator;
  constructor(private router:Router,private dialog:MatDialog,private conditionalRenderService:ConditionalRenderComponentService,private communicationService:CommunicationServiceService){
        
  }
  ngOnInit(): void {
    this.communicationService.$data.subscribe({
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
  applyFilter(event:any){
    if(event.target.length>2){
      this.dataSource.filter=(event.target as HTMLInputElement).value.trim().toLowerCase();
    }
    
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
  showForm(){
    this.conditionalRenderService.changeComponent('');
  }
}
