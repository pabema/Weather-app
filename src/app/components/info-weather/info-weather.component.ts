import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { RoundPipe } from '../../pipes/round.pipe';
import { DailyForecastComponent } from '../daily-forecast/daily-forecast.component';

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

  ubicacion: any = this.getRandomCity();
  datos: any = [];

  image_display: string = '';

  constructor(private req: RequestService) {}

  obtenerDatosCiudad() {
    console.log(this.ubicacion);
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.ubicacion}?unitGroup=metric&key=GU79KU3ZKLN4855LDJD4RV9CZ&contentType=json`;
    this.req.getInfoWeather(url).then(
      (response: any) => {
        this.datos = response;
        this.image_display = `assets/icons/${response.currentConditions.icon}.svg`;
        console.log(this.image_display);
        console.log(this.datos); // Aquí tendrás los datos recibidos de la API
      },
      (error: any) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  onSubmit() {
    this.obtenerDatosCiudad();
  }

  ngOnInit(): void {
    this.obtenerDatosCiudad();
    // document.addEventListener('click', () => {
    //   console.log(this.ubicacion);
    //   console.log(this.datos.resolvedAddress);
    //   console.log(this.image_display);
    // });
  }

  getRandomCity() {
    // console.log(this.cities[Math.floor(Math.random() * 7)]);
    return this.cities[Math.floor(Math.random() * this.cities.length - 1)];
  }
}
