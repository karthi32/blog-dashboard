import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostsComponent } from './posts/all-posts/all-posts.component';
import { NewPostsComponent } from './posts/new-posts/new-posts.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { SubscribersComponent } from './subscribers/subscribers.component';

const routes: Routes = [
  {path:'', component: DashboardComponent, canActivate: [AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'categories', component: CategoriesComponent, canActivate: [AuthGuard]},
  {path:'posts', component: AllPostsComponent, canActivate: [AuthGuard]},
  {path:'posts/new', component: NewPostsComponent, canActivate: [AuthGuard]},
  {path:'subscribers', component: SubscribersComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
