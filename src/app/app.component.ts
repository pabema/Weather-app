import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InicialComponent } from './components/inicial/inicial.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InicialComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'weather-app';
}
