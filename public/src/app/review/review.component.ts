import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormArray } from '@angular/forms';
import { ParamMap } from '@angular/router';

import { Review } from '../models';
import { RestaurantService } from '../services/pet.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit, OnDestroy {
  review = new Review();
  sub: Subscription;
  reviewErrors: string[] = [];
  restaurantId: any;
  currentRestaurant: any;
  constructor(
    private readonly _restaurant: RestaurantService,
    private readonly router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.paramMap.subscribe(
      (params: ParamMap) => (this.restaurantId = params.get('id'))
    );
    this._restaurant.getRestaurant(this.restaurantId).subscribe(rest => {
      console.log('the restaurant! ' + rest['restaurant']);
      this.currentRestaurant = rest['restaurant'];
    });
  }

  onSubmit(event: Event, review: Review) {
    // const x = event.cancelable;
    // console.log('Can it be canceled? ' + x);
    this.sub = this._restaurant
      .reviewRestaurant(this.restaurantId, review)
      .subscribe(
        newRestaurant => {
          console.log(newRestaurant);
          this.router.navigateByUrl('/restaurants/' + this.restaurantId);
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
    this.reviewErrors = Array.isArray(error) ? error : [error];
  }
}
