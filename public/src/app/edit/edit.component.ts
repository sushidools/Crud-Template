import { Component, OnInit, OnDestroy } from '@angular/core';
import { PetService } from '../services/pet.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Pet } from '../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  PetEdit = new Pet();
  sub: Subscription;
  petErrors: string[] = [];
  petId: any;
  constructor(
    private _pet: PetService,
    private router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.paramMap.subscribe(
      (params: ParamMap) => (this.petId = params.get('id'))
    );
    this._pet.getPet(this.petId).subscribe(data => {
      this.PetEdit = data['pet'];
    });
  }

  onSubmit(event: Event, PetEdit: Pet) {
    console.log('The post to be editted from the component ', PetEdit);
    event.preventDefault();
    this.sub = this._pet.editPet(this.petId, PetEdit).subscribe(
      edittedPet => {
        console.log(edittedPet);
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
