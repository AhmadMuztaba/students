import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ConditionalRenderComponentService } from 'src/app/@services/conditional-render-component.service';
import { DetailsComponent } from '../details/details.component';
import { ListsDataSource, ListsItem } from './lists-datasource';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ListsItem>;
  dataSource: ListsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','phone','email','profession','actions'];

  constructor(private dialog:MatDialog,private conditionalRenderService:ConditionalRenderComponentService) {
    this.dataSource = new ListsDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
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
    this.conditionalRenderService.changeComponent('form');
  }
}
