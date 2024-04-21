import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { tap, catchError, debounceTime  } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DisplayflightsComponent } from '../displayflights/displayflights.component';
import { of} from 'rxjs';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

interface LoginResponse {
  token: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, RegisterComponent, DisplayflightsComponent, NgbAlertModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user = {
    id: 0,
    username: '',
    password: '',
    email: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    const userData = {
      username: this.user.username,
      password: this.user.password,
      email: this.user.email || '', 
      id: this.user.id || 0 
    };
  
    this.http.post<any>('http://localhost:5111/api/Login', userData)
      .pipe(
        tap(response => {
          console.log('Login successful', response); 

          const token = response.token;
          this.router.navigate(['/displayflights-component'], { state: { token } });
        }),
        catchError(error => {
          console.error('Login failed', error);
          this.showAlertMessage();
          return of(null);
        })
      )
      .subscribe();
  }

  showAlert = false; 
  alertType = 'warning'; 
  alertMessage = 'Invalid username or password. Please try again.';
  
  showAlertMessage(): void {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 4000);
  }
}
