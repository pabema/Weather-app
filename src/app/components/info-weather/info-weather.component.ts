import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { RoundPipe } from '../../pipes/round.pipe';
import { DailyForecastComponent } from '../daily-forecast/daily-forecast.component';
import { API_KEY } from '../../../../key';

@Component({
  selector: 'app-info-weather',
  standalone: true,
  imports: [CommonModule, FormsModule, RoundPipe, DailyForecastComponent],
  templateUrl: './info-weather.component.html',
  styleUrl: './info-weather.component.css',
})
export class InfoWeatherComponent implements OnInit {
  // prettier-ignore
  cities = [
    "New York", "London", "Tokyo", "Paris", "Sydney",
    "Los Angeles", "Hong Kong", "Dubai", "Singapore", "Rome",
    "Berlin", "Madrid", "Toronto", "Moscow", "San Francisco",
    "São Paulo", "Beijing", "Bangkok", "Seoul", "Mumbai",
    "Mexico City", "Buenos Aires", "Istanbul", "Chicago", "Johannesburg",
    "Melbourne", "Amsterdam", "Milan", "Barcelona", "Lisbon",
    "Vienna", "Vancouver", "Miami", "Shanghai", "Rio de Janeiro",
    "Cairo", "Dublin", "Kuala Lumpur", "Zurich", "Brussels",
    "Oslo", "Stockholm", "Athens", "Copenhagen", "Warsaw",
    "Prague", "Budapest", "Helsinki", "Tel Aviv", "Doha"
  ];
  @ViewChild('current_weather') current_weather!: ElementRef<HTMLDivElement>;
  ubicacion: any = this.getRandomCity();
  datos: any = [];
  datos_completos: any = [];

  dia: string = '';

  image_display: string = '';

  constructor(private req: RequestService) {}

  @Output() dataChanged = new EventEmitter<number[]>();
  @Output() dataChanged2 = new EventEmitter<number[]>();
  @Output() warnings = new EventEmitter<number[]>();

  sendData(): void {
    let datos = this.datos?.hours;
    let data: any[] | undefined = [];
    let temp: any[] | undefined = [];
    datos.map((hora: any, index: number) => {
      // console.log(hora.datetime);
      if (index % 2 == 0) {
        temp.push(hora.temp);
        data.push(hora.datetime.substring(0, 5));
      }
    });

    this.dataChanged.emit(data);
    this.dataChanged2.emit(temp);
    this.warnings.emit(this.datos_completos.alerts);
  }

  obtenerDatosCiudad(index: number) {
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.ubicacion}?unitGroup=metric&key=${API_KEY}&contentType=json`;
    this.req.getInfoWeather(url).then(
      (response: any) => {
        this.datos = response.days[index];
        this.datos_completos = response;
        this.image_display = `assets/icons/${this.datos?.icon}.svg`;
        this.dia = this.obtenerDiaSemana(this.datos?.datetime);
        this.sendData();
        this.updateBackgroundBasedOnWeather();
        // console.log(this.datos_completos);
      },
      (error: any) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  onSubmit() {
    this.obtenerDatosCiudad(0);
  }

  ngOnInit(): void {
    this.obtenerDatosCiudad(0);
  }

  getRandomCity() {
    // console.log(this.cities[Math.floor(Math.random() * 7)]);
    return this.cities[Math.floor(Math.random() * this.cities.length - 1)];
  }

  obtenerDiaSemana(fecha: string): string {
    const diasSemana = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const date = new Date(fecha);
    const dia = date.getDay();
    return diasSemana[dia];
  }

  cambiarDatos(index: number) {
    this.obtenerDatosCiudad(index);
  }

  obtenerCiudadRandom() {
    this.ubicacion = this.getRandomCity();
    // console.log(this.ubicacion);
    this.obtenerDatosCiudad(0);
  }
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  scrollLeft(): void {
    this.scrollContainer.nativeElement.scrollBy({
      left: -100, // Desplaza 100px a la izquierda
      behavior: 'smooth', // Desplazamiento suave
    });
  }

  scrollRight(): void {
    this.scrollContainer.nativeElement.scrollBy({
      left: 100, // Desplaza 100px a la derecha
      behavior: 'smooth', // Desplazamiento suave
    });
  }

  private updateBackgroundBasedOnWeather(): void {
    let weatherCondition = this.datos?.icon;
    if (this.current_weather) {
      switch (weatherCondition) {
        case 'clear-day':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/clear-day.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        case 'cloudy':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/cloudy.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        case 'clear-night':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/clear-night.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        case 'fog':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/fog.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        case 'hail':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/hail.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        case 'partly-cloudy-day':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/partly-cloudy-day.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        case 'partly-cloudy-night':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/partly-cloudy-night.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        case 'rain-snow-showers-day':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/rain-snow-showers-day.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        case 'rain-snow-showers-night':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/rain-snow-showers-night.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        case 'rain-snow':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/rain-snow.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        case 'rain':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/rain.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        case 'showers-day':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/showers-day.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        case 'showers-night':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/showers-night.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        case 'sleet':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/sleet.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        case 'snow-showers-day':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/snow-showers-day.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        case 'snow-showers-night':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/snow-showers-night.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        case 'snow':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/snow.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        case 'thunder-rain':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/thunder-rain.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        case 'thunder-showers-day':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/thunder-showers-day.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        case 'thunder-showers-night':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/thunder-showers-night.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        case 'thunder':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/thunder.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        case 'wind':
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/wind.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
        default:
          this.current_weather.nativeElement.style.background =
            'url("/assets/backgrounds/clear-day.jpg")';
          this.current_weather.nativeElement.style.backgroundRepeat =
            'no-repeat';
          this.current_weather.nativeElement.style.backgroundSize = 'cover';
          this.current_weather.nativeElement.style.backgroundPosition =
            'center';
          break;
      }
    }
  }
}
