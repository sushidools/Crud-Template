import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Restaurant } from './../models';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private readonly base = '/api/restaurants';
  constructor(private readonly http: HttpClient) {}

  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    // console.log('Posting the restaurant ', restaurant);
    return this.http.post<Restaurant>(`${this.base}/new`, restaurant);
  }

  getRestaurant(id: string): Observable<Restaurant[]> {
    // console.log('Getting the restaurant ', id);
    return this.http.get<Restaurant[]>(`${this.base}/${id}`);
  }

  getRestaurants(): Observable<Restaurant[]> {
    // console.log('Getting the pets ');
    return this.http.get<Restaurant[]>(`${this.base}`);
  }

  editRestaurant(id: string, restaurant: Restaurant): Observable<Restaurant> {
    // console.log('The restaurant id ', id);
    return this.http.put<Restaurant>(`${this.base}/${id}`, restaurant);
  }

  reviewRestaurant(id: string, reviewObject): Observable<Restaurant> {
    // console.log('The restaurant id ', id);
    return this.http.patch<Restaurant>(
      `${this.base}/${id}/review`,
      reviewObject
    );
  }

  deleteRestaurant(id: string): Observable<Restaurant> {
    // console.log('The restaurant id to remove', id);
    return this.http.delete<Restaurant>(`${this.base}/${id}`);
  }
}
