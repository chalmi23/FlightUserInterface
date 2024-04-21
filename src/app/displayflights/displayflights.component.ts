import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-displayflights',
  standalone: true,
  imports: [HttpClientModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, NgbAlertModule],
  templateUrl: './displayflights.component.html',
  styleUrl: './displayflights.component.scss'
})

export class DisplayflightsComponent {
  flights: any[] = [];
  token: string = '';

  constructor(private http: HttpClient, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.token = navigation.extras.state['token']; 
    }
  }

  displayFlightError = false;

  getFlights(): void {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  this.http.get<any[]>('http://localhost:5111/api/Flight', { headers })
    .pipe(
      tap({
        next: response => {
          console.log('Dane o lotach:', response);
          this.flights = response;
        },
        error: error => {
          console.error('Błąd podczas pobierania lotów:', error);
          this.displayFlightError = true;
          this.showAlertMessage('danger', 'Błąd podczas pobierania danych. Sprawdź ważność tokenu bądź spróbuj ponownie później!');
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
      this.displayFlightError = false;
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
