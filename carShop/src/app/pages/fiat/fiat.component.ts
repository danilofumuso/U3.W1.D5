import { Component, OnInit } from '@angular/core';
import { iCar } from '../../interfaces/i-car';

@Component({
  selector: 'app-fiat',
  templateUrl: './fiat.component.html',
  styleUrl: './fiat.component.scss',
})
export class FiatComponent implements OnInit {
  cars: iCar[] = [];

  ngOnInit() {
    fetch('db.json')
      .then((response) => {
        if (response.ok) {
          return <Promise<iCar[]>>response.json();
        } else {
          throw new Error('Errore nella get!');
        }
      })
      .then((data) => {
        this.cars = data.filter((car) => car.brand.toLowerCase() === 'fiat');
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }
}
