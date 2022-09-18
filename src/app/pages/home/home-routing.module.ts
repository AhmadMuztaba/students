import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ListsComponent } from './lists/lists.component';
import { ModalRouteComponent } from './modal-route/modal-route.component';

const routes: Routes = [{
  path:'',
  component:HomeComponent,
  children:[
    {
      path:':id',
      component:ModalRouteComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
