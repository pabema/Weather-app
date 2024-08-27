import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RoundPipe } from '../../pipes/round.pipe';

@Component({
  selector: 'app-daily-forecast',
  standalone: true,
  imports: [CommonModule, RoundPipe],
  templateUrl: './daily-forecast.component.html',
  styleUrl: './daily-forecast.component.css',
})
export class DailyForecastComponent implements OnInit {
  @Input() datos_diarios: any;

  imagen: string = '';
  dia: string = '';

  ngOnInit(): void {
    this.imagen = `assets/icons/${this.datos_diarios.icon}.svg`;
    this.dia = this.obtenerDiaSemana(this.datos_diarios?.datetime);
    // console.log(this.datos_diarios);
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
}
