import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-weather-forecast',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.css',
})
export class WeatherForecastComponent implements OnChanges, AfterViewInit {
  @Input() data: any[] = []; // Etiquetas del gráfico
  @Input() data2: any[] = []; // Datos del gráfico
  @Input() warning: any[] = []; // Advertencias, si las hay
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart: Chart | undefined;

  // Método para manejar cambios en los inputs
  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart && (changes['data'] || changes['data2'])) {
      this.updateChart(); // Actualiza el gráfico si hay cambios en los datos
      // console.log(this.warning); // Muestra advertencias en la consola
    }
  }

  // Método para inicializar el gráfico después de que la vista esté lista
  ngAfterViewInit(): void {
    this.updateChart();
  }

  // Método para actualizar el gráfico
  private updateChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    // Destruye el gráfico anterior si existe para evitar fugas de memoria
    if (this.chart) {
      this.chart.destroy();
    }

    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.data, // Etiquetas en el eje X
          datasets: [
            {
              data: this.data2.map((dato) => Math.round(dato)), // Datos en el eje Y
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderColor: 'rgba(255, 255, 255, 1)',
              borderWidth: 1,
              tension: 0.4, // Hacer que las líneas sean curvas
              fill: true, // Habilitar el relleno bajo la línea
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false, // Oculta la leyenda
            },
          },
          scales: {
            x: {
              ticks: {
                color: 'white',
              },
              grid: {
                color: function (context) {
                  if (context.tick.value === 0) {
                    return 'white';
                  }
                  return 'rgba(0, 0, 0, 0.1)';
                },
              },
            },
            y: {
              min:
                Math.round(Math.min(...this.data2)) < 0
                  ? Math.round(Math.min(...this.data2)) - 10
                  : 0, // Ajusta el mínimo si es necesario
              max:
                Math.round(Math.max(...this.data2)) < 0
                  ? 0
                  : Math.round(Math.max(...this.data2)) + 10, // Ajusta el máximo si es necesario
              beginAtZero: true, // Asegúrate de que este ajuste esté en `false` si no quieres que comience en 0
              ticks: {
                color: 'white',
              },
              grid: {
                color: function (context) {
                  if (context.tick.value === 0) {
                    return 'white';
                  }
                  return 'rgba(0, 0, 0, 0.1)';
                },
              },
            },
          },
        },
      });
    }
  }
}
