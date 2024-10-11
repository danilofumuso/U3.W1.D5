import { Component, OnInit } from '@angular/core';
import { iCar } from '../../interfaces/i-car';

@Component({
  selector: 'app-ford',
  templateUrl: './ford.component.html',
  styleUrl: './ford.component.scss',
})
export class FordComponent implements OnInit {
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
        this.cars = data.filter((car) => car.brand.toLowerCase() === 'ford');
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }
}
