import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavComponent } from './nav/nav.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ListsComponent } from './lists/lists.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    HomeComponent,
    NavComponent,
    ListsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class HomeModule { }
