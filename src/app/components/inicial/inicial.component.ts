import { Component, OnInit } from '@angular/core';
import { get } from 'node:http';

@Component({
  selector: 'app-inicial',
  standalone: true,
  imports: [],
  templateUrl: './inicial.component.html',
  styleUrl: './inicial.component.css',
})
export class InicialComponent implements OnInit {
  url: string =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Canals%2C%20Valencia?unitGroup=metric&key=GU79KU3ZKLN4855LDJD4RV9CZ&contentType=json';

  ngOnInit(): void {
    fetch(this.url, {
      method: 'get',
      headers: {},
    })
      .then((response) => response.json())
      .then(console.log);
  }
}
