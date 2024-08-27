import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-forecast.component.html',
  styleUrl: './daily-forecast.component.css',
})
export class DailyForecastComponent implements OnInit {
  @Input() datos_diarios: any;

  imagen: string = '';

  ngOnInit(): void {
    this.imagen = `assets/icons/${this.datos_diarios.icon}.svg`;

    console.log(this.datos_diarios);
  }

  obtenerDiaSemana(fecha: string): string {
    const diasSemana = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    const date = new Date(fecha);
    const dia = date.getDay();
    return diasSemana[dia];
  }
}
