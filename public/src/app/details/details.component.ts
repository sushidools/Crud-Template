import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../models';
import { RestaurantService } from '../services/pet.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParamMap } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  restaurant: any;
  sub: Subscription;
  restaurantId: any;
  reviews: any;

  constructor(
    private _restaurant: RestaurantService,
    private router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.paramMap.subscribe(
      (params: ParamMap) => (this.restaurantId = params.get('id'))
    );
    this._restaurant.getRestaurant(this.restaurantId).subscribe(data => {
      this.restaurant = data['restaurant'];
      console.log(
        'Here are the reviews for the restaurant ' + this.restaurant.reviews
      );
      this.restaurantId = this.restaurant._id;
      this.reviews = this.restaurant.reviews;
    });
  }
}
