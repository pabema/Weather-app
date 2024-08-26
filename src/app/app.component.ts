import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfoWeatherComponent } from './components/info-weather/info-weather.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InfoWeatherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'weather-app';
}
