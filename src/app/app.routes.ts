import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DisplayflightsComponent } from './displayflights/displayflights.component';
import { AddnewflightComponent } from './addnewflight/addnewflight.component';
import { EditflightComponent } from './editflight/editflight.component';

const routes: Routes = [
  { path: 'login-component', component: LoginComponent },
  { path: 'register-component', component: RegisterComponent },
  { path: 'displayflights-component', component: DisplayflightsComponent },
  { path: 'addnewflight-component', component: AddnewflightComponent },
  { path: 'editflight-component', component: EditflightComponent },
  { path: '', redirectTo: 'login-component', pathMatch: 'full' }
];

export default routes;