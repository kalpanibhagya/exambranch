import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { UpdatesComponent } from './components/updates/updates.component';
import { ExamsComponent } from './components/exams/exams.component';
import { EditExamComponent } from './components/exams/edit-exam/edit-exam.component';
import { DeleteExamComponent } from './components/exams/delete-exam/delete-exam.component';
import { RepeatersComponent } from './components/repeaters/repeaters.component';
import { UsersComponent } from './components/users/users.component';
import { UndergraduateProfileComponent } from './components/undergraduate-profile/undergraduate-profile.component';
import { RepeatFormComponent } from './components/repeat-form/repeat-form.component';
import { EditRepeatComponent } from './components/repeat-form/edit-repeat/edit-repeat.component';
import { DeleteRepeatComponent } from './components/repeat-form/delete-repeat/delete-repeat.component';
import { EditUpdateComponent } from './components/updates/edit-update/edit-update.component';
import { DeleteUpdateComponent } from './components/updates/delete-update/delete-update.component';

// Our Array of Angular 2 Routes
const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent // Default Route
  },
  {
    path: 'admindashboard',
    component: DashboardAdminComponent, // Dashboard Route,
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'edit-exam/:id',
    component: EditExamComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'delete-exam/:id',
    component: DeleteExamComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'exams',
    component: ExamsComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'repeaters',
    component: RepeatersComponent, // Dashboard Route,
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'edit-repeat/:id',
    component: EditRepeatComponent, // Dashboard Route,
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'delete-repeat/:id',
    component: DeleteRepeatComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent, // Dashboard Route,
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'dashboard',
    component: DashboardComponent, // Dashboard Route,
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'updates',
    component: UpdatesComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-update/:id',
    component: EditUpdateComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'delete-update/:id',
    component: DeleteUpdateComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent, // Register Route
    canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  },
  {
    path: 'login',
    component: LoginComponent, // Login Route
    canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  },
  {
    path: 'profile',
    component: ProfileComponent, // Profile Route
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'u_profile',
    component: UndergraduateProfileComponent, // Profile Route
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'repeat_form',
    component: RepeatFormComponent, // Profile Route
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  { path: '**', component: HomeComponent } // "Catch-All" Route
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }