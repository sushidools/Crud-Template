import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormArray } from '@angular/forms';

import { Restaurant } from '../models';
import { RestaurantService } from '../services/pet.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit, OnDestroy {
  restaurant = new Restaurant();
  sub: Subscription;
  restaurantErrors: string[] = [];

  constructor(
    private readonly _restaurant: RestaurantService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  onSubmit(event: Event, restaurant: Restaurant) {
    // const x = event.cancelable;
    // console.log('Can it be canceled? ' + x);
    this.sub = this._restaurant.addRestaurant(restaurant).subscribe(
      newRestaurant => {
        console.log(newRestaurant);
        this.router.navigateByUrl('');
      },
      error => {
        // console.log(error);
        this.handleErrors(error.error);
        event.stopPropagation();
        event.preventDefault();
      }
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private handleErrors(error: string | string[]) {
    this.restaurantErrors = Array.isArray(error) ? error : [error];
  }
}
