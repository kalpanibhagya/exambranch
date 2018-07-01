import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { UpdateService } from './services/update.service';
//import { ExamService } from './services/exam.service';
import { UserService} from './services/user.service';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { UpdatesComponent } from './components/updates/updates.component';
import { FooterComponent } from './components/footer/footer.component';
//import { ExamsComponent } from './components/exams/exams.component';
import { RepeatersComponent } from './components/repeaters/repeaters.component';
import { UsersComponent } from './components/users/users.component';
import { UndergraduateProfileComponent } from './components/undergraduate-profile/undergraduate-profile.component';
import { RepeatFormComponent } from './components/repeat-form/repeat-form.component';
import { ExamsComponent } from './components/exams/exams.component';

//import { FlashMessagesModule } from 'angular2-flash-messages';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    DashboardAdminComponent,
    UpdatesComponent,
    FooterComponent,
    RepeatersComponent,
    UsersComponent,
    UndergraduateProfileComponent,
    RepeatFormComponent,
    ExamsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
   // FlashMessagesModule.forRoot(),
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard, UpdateService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
