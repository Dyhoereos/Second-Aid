import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProcComponent } from './proc/proc.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
      path: '',
      component: AppComponent
  },
  {
      path: 'procedure',
      component: ProcComponent
  },
  {
      path: 'login',
      component: LoginComponent
  },
  {
      path: 'home',
      redirectTo: '',
      pathMatch: 'full'
  },
  {
      path: '**',
      redirectTo: '',
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    ProcComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
          { path: '', component: AppComponent },
          { path: 'login', component: LoginComponent },
          { path: 'logout', component: LogoutComponent },
          { path: 'procedure', component: ProcComponent }
          ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
