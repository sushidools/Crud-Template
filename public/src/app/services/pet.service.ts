import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Pet } from './../models';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private readonly base = '/api/pet';
  constructor(
    private readonly http: HttpClient
  ) { }

  addPet(pet: Pet): Observable<Pet> {
    console.log('Posting the pet ', pet);
    return this.http.post<Pet>(`${this.base}/new`, pet);
  }

  getPet(id: string): Observable<Pet[]> {
    console.log('Getting the pet ', id);
    return this.http.get<Pet[]>(`${this.base}/${id}`);
  }

  getPets(): Observable<Pet[]> {
    console.log('Getting the pets ');
    return this.http.get<Pet[]>(`${this.base}`);
  }

  editPet(id: string, pet: Pet): Observable<Pet> {
    console.log('The pet id ', id);
    return this.http.put<Pet>(`${this.base}/${id}`, pet);
  }

  likePet(id: string, like): Observable<Pet> {
    console.log('The pet id ', id);
    return this.http.patch<Pet>(`${this.base}/likes/${id}`, like);
  }

  adoptPet(id: string): Observable<Pet> {
    console.log('The pet id to remove', id);
    return this.http.delete<Pet>(`${this.base}/${id}`);
  }

}
