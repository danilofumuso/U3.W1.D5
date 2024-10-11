import { Component, OnInit } from '@angular/core';
import { iCar } from '../../interfaces/i-car';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  cars: iCar[] = [];
  shuffledCars: iCar[] = [];

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
        this.cars = data;

        //Fisher-Yates Sorting Algorithm
        const shuffle = (array: iCar[]) => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        };

        this.shuffledCars = structuredClone(this.cars);
        this.shuffledCars = shuffle(this.shuffledCars);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }
}
