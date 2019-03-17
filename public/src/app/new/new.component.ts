import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Pet } from './../models';
import { PetService } from '../services/pet.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit, OnDestroy {
  pet = new Pet();
  sub: Subscription;
  petErrors: string[] = [];

  constructor(
    private readonly _pet: PetService,
    private readonly router: Router
  ) { }

  ngOnInit() { }

  onSubmit(event: Event, pet: Pet) {
    event.preventDefault();
    this.sub = this._pet.addPet(pet).subscribe(
      newPet => {
        console.log(newPet);
        this.router.navigateByUrl('');
      },
      error => {
        console.log(error);
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
    this.petErrors = Array.isArray(error) ? error : [error];
  }

  GoBack() {
    this.router.navigateByUrl('/pets');
  }
}
