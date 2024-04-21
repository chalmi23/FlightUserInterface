import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editflight',
  standalone: true,
  imports: [HttpClientModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, NgbAlertModule],
  templateUrl: './editflight.component.html',
  styleUrl: './editflight.component.scss'
})

export class EditflightComponent {

  token: string = '';

  constructor(private http: HttpClient, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.token = navigation.extras.state['token']; 
    }
  }

  flightId: number | undefined;
  flight: any;

  getFlightById(): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    
    this.http.get<any[]>('http://localhost:5111/api/Flight/' + this.flightId, { headers })
    .pipe(
      tap({
        next: response => {
          console.log('Dane o lotach:', response);
          this.flight = response;
        },
        error: error => {
          console.error('Błąd podczas pobierania lotów:', error);
          this.editFlightError = true;
          this.showAlertMessage('danger', 'Błąd podczas pobierania danych. Sprawdź ważność tokenu bądź spróbuj ponownie później!');
        }
      })
    )
    .subscribe();
  }

  editedFlightData = {
    id: 0,
    flightNumber: '',
    departureDate: '',
    departureLocation: '',
    arrivalLocation: '',
    aircraftType: ''
  };

  editFlight(): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    
    this.http.put<any>('http://localhost:5111/api/Flight/' + this.editedFlightData.id, this.editedFlightData, { headers })
      .pipe(
        tap({
          next: response => {
            console.log('Edytowano lot:', response);
            this.flight = response;
            this.editFlightSuccess = true;
            this.showAlertMessage('success', 'Pomyślnie edytowano lot.');
          },
          error: error => {
            console.error('Błąd podczas edycji lotu:', error);
            this.editFlightError = true;
            this.showAlertMessage('danger', 'Błąd podczas edycji lotu. Sprawdź ważność tokenu/danych bądź spróbuj ponownie później!');
          }
        })
      )
      .subscribe();
  }

  flightIdToDelete: number | undefined;
  deleteFlight(): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    
    this.http.delete<any>('http://localhost:5111/api/Flight/' + this.flightIdToDelete, { headers })
      .pipe(
        tap({
          next: response => {
            console.log('Usunięto lot:', response);
            this.editFlightSuccess = true;
            this.showAlertMessage('success', 'Pomyślnie usunięto lot.');
          },
          error: error => {
            console.error('Błąd podczas usuwania lotu:', error);
            this.editFlightError = true;
            this.showAlertMessage('danger', 'Błąd podczas usuwania lotu. Sprawdź ID bądź ważność tokenu.');
          }
        })
      )
      .subscribe();
  }

  alertType = '';
  alertMessage = '';
  editFlightSuccess = false;
  editFlightError = false;
  
  showAlertMessage(type: string, message: string): void {
    this.alertType = type;
    this.alertMessage = message;
    setTimeout(() => {
      this.editFlightSuccess = false;
      this.editFlightError = false;
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
