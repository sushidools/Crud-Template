import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../models';
import { RestaurantService } from '../services/pet.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  restaurants: any;
  showEdit = false;
  eRestaurant: any;
  sub: Subscription;

  constructor(
    private readonly _restaurant: RestaurantService,
    private router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._restaurant.getRestaurants().subscribe(data => {
      // console.log('Got our data ', data);
      this.restaurants = data['restaurants'];
    });
  }
  refresh() {
    this.router.navigate(['/restaurants']);
    this.ngOnInit();
  }

  onClick(event: Event) {
    event.stopPropagation();
  }

  viewRestaurant(p) {
    const restaurantId = p._id;
    this.router.navigateByUrl('/restaurants/' + restaurantId);
  }

  onClickE(event: Event) {
    event.stopPropagation();
  }

  editRestaurant(p) {
    const restaurantId = p._id;
    this.router.navigateByUrl('/restaurants/' + restaurantId + '/edit');
  }

  onClickD(event: Event) {
    event.stopPropagation();
  }

  delete(r) {
    console.log('Deleting the restaurant ' + r);
    const deletingRestaurant = this._restaurant.deleteRestaurant(r);
    deletingRestaurant.subscribe(data => {
      console.log('Inside deleting in component ', data);
      this.refresh();
    });
  }
}
