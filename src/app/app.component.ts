import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfoWeatherComponent } from './components/info-weather/info-weather.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InfoWeatherComponent, WeatherForecastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'weather-app';

  chartData: any[] = [];
  chartData2: any[] = [];
  warningData: any[] = [];

  updateChartData(data: any[]): void {
    this.chartData = data;

    // console.log(this.chartData);
  }

  updateChartData2(data: any[]): void {
    this.chartData2 = data;
    // console.log(this.chartData2);
  }

  updateWarning(data: any[]): void {
    this.warningData = data;
    // console.log(this.warningData);
  }
}
