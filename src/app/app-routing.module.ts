import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/AuthModules/login/login/login.component';
import { MetaDataComponent } from './modules/meta-data/meta-data.component';

const routes: Routes = [
  {path:"" , component: MetaDataComponent},
  {path: "login", component: LoginComponent},
  {path: "metadata", component: MetaDataComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
