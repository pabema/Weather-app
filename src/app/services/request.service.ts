import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor() {}

  public getInfoWeather(url: string): Promise<any> {
    return fetch(url, {
      method: 'get',
      headers: {},
    })
      .then((response) => response.json())
      .then((datos) => {
        // console.log(datos);
        return datos;
      });
  }
}
