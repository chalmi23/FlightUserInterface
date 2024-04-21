import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { LoginComponent } from '../login/login.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [HttpClientModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, LoginComponent, NgbAlertModule],
})
export class RegisterComponent {
  user = {
    id: 0,
    username: '',
    password: '',
    email: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    const userData = {
      id: 0,
      username: this.user.username,
      password: this.user.password,
      email: this.user.email
    };

      console.log('Data to be sent:', this.user);
      this.http.post('http://localhost:5111/api/Register', this.user)
          .pipe(
              tap({
                  next: response => {
                      console.log('Registration successful', response);
                      this.registrationSuccess = true;
                      this.showAlertMessage('success', 'User created successfully!');
                  },
                  error: error => {
                      console.error('Registration failed', error);
                      this.registrationError = true;
                      this.showAlertMessage('danger', 'Registration failed. Check the input data or please try again later.');
                  }
              })
          ).subscribe();
  }
 
  alertType = '';
  alertMessage = '';
  registrationSuccess = false;
  registrationError = false;

  showAlertMessage(type: string, message: string): void {
    this.alertType = type;
    this.alertMessage = message;
    setTimeout(() => {
      this.registrationSuccess = false;
      this.registrationError = false;
    }, 4000);
  }
}