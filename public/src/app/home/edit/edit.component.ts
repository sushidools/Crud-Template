import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestaurantService } from '../../services/pet.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Restaurant } from '../../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy {
  RestaurantEdit: any;
  sub: Subscription;
  restaurantErrors: string[] = [];
  restaurantId: any;
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
      this.RestaurantEdit = data['restaurant'];
    });
  }

  onSubmit(event: Event, RestaurantEdit: Restaurant) {
    console.log(
      'The restaurant to be editted from the component ',
      RestaurantEdit
    );
    event.preventDefault();
    this.sub = this._restaurant
      .editRestaurant(this.restaurantId, RestaurantEdit)
      .subscribe(
        edittedRestaurant => {
          // console.log(edittedPet);
          this.router.navigateByUrl('');
        },
        error => {
          // console.log(error);
          this.handleErrors(error.error);
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
    // console.log('Here is the error ', this.RestaurantErrors);
  }

  GoBack() {
    this.router.navigateByUrl('/restaurants');
  }
}
