import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home.component';
import { ListsComponent } from './lists/lists.component';
import { ModalRouteComponent } from './modal-route/modal-route.component';
import { ShowDetailsComponent } from './show-details/show-details.component';

const routes: Routes = [{
  path:'',
  component:HomeComponent,
  children:[
    {
      path:'show/:id',
      component:FormComponent,
      pathMatch:'full'
    },
    {
      path:':id',
      component:ModalRouteComponent,
    },
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
