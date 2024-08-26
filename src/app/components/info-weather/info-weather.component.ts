import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { url } from 'inspector';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-info-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './info-weather.component.html',
  styleUrl: './info-weather.component.css',
})
export class InfoWeatherComponent implements OnInit {
  ubicacion: any = '';
  datos: any = [];

  image_display: string = '';

  constructor(private req: RequestService) {}

  onSubmit() {
    // console.log(this.ubicacion);
    // let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.ubicacion}?unitGroup=metric&key=GU79KU3ZKLN4855LDJD4RV9CZ&contentType=json`;
    // this.req.getInfoWeather(url).then(
    //   (response: any) => {
    //     this.datos = response;
    //     this.image_display = `assets/${response.currentConditions.icon}.svg`;
    //     console.log(this.image_display);
    //     console.log(this.datos); // Aquí tendrás los datos recibidos de la API
    //   },
    //   (error: any) => {
    //     console.error('Error al obtener los datos:', error);
    //   }
    // );
  }

  ngOnInit(): void {
    // document.addEventListener('click', () => {
    //   console.log(this.ubicacion);
    //   console.log(this.datos.resolvedAddress);
    //   console.log(this.image_display);
    // });
  }
}
