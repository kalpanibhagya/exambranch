import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const appRoutes: Routes = [
    { 
        path: '',
        component: HomeComponent
    },
    { 
        path: 'dashboard',
        component: DashboardComponent
    },
    { path: '**', component: HomeComponent } //any illegal url changes redirect to the home page
  ];
@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  