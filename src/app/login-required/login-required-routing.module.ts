import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRequiredPage } from './login-required.page';

const routes: Routes = [
  {
    path: '',
    component: LoginRequiredPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRequiredPageRoutingModule {}
