import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addnewflight',
  standalone: true,
  imports: [HttpClientModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, NgbAlertModule],
  templateUrl: './addnewflight.component.html',
  styleUrl: './addnewflight.component.scss'
})

export class AddnewflightComponent {

  token: string = '';
  constructor(private http: HttpClient, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.token = navigation.extras.state['token']; 
    }
  }

  newFlight = {
    id: 0,
    flightNumber: '',
    departureDate: '',
    departureLocation: '',
    arrivalLocation: '',
    aircraftType: ''
  };

  addFlightSuccess = false;
  addFlightError = false;

  addNewFlight(): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.http.post<any>('http://localhost:5111/api/Flight', this.newFlight, { headers })
      .pipe(
        tap({
          next: response => {
            this.addFlightSuccess = true;
            this.showAlertMessage('success', 'Lot dodany prawidłowo!');
            console.log('Dodano nowy lot:', response);
          },
          error: error => {
            this.addFlightSuccess = false;
            this.showAlertMessage('danger', 'Błąd dodawania. Sprawdź dane wejściowe bądź ważność tokenu!');
            console.error('Błąd podczas dodawania nowego lotu:', error);
          }
        })
      )
      .subscribe();
  }

  alertType = '';
  alertMessage = '';

  showAlertMessage(type: string, message: string): void {
    this.alertType = type;
    this.alertMessage = message;
    setTimeout(() => {
      this.addFlightSuccess = false;
      this.addFlightError = false;
    }, 4000);
  }

  navigateWithToken(url: string) {
    const navigationExtras = {
      state: {
        token: this.token
      }
    };
    this.router.navigate([url], navigationExtras);
  }
}
