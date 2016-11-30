import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProcComponent } from './proc/proc.component';
// import { AuthGuard } from './authguard';
import { AuthService } from './auth.service';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    ProcComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
          { path: '', component: LoginComponent },
          { path: 'login', component: LoginComponent },
          { path: 'logout', component: LogoutComponent },
          // { path: 'procedures', component: ProcComponent, canActivate: [AuthGuard] },
          { path: 'procedures', component: ProcComponent},
          { path: '**', component: NotFoundComponent}
          ])
  ],
  // providers: [AuthService, AuthGuard],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
