import { Component, OnInit } from '@angular/core';
import { Pet } from '../models';
import { PetService } from '../services/pet.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParamMap } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  pet = new Pet;
  sub: Subscription;
  petId: any;
  likes: any;
  isDisabled: boolean = false;

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
      this.pet = data['pet'];
      console.log('Here is the pet likes ' + this.pet.likes);
      this.petId = this.pet._id;
    });
  }

  refresh() {
    this.router.navigateByUrl('/pets/' + this.petId);
    this.isDisabled = true;
  }

  onClick(event: Event) {
    event.stopPropagation();
  }

  onClickL(event: Event) {
    event.stopPropagation();
  }

  deletepet(pet) {
    const petId = pet._id;
    // console.log('The pet to be deleted ', petId);
    this._pet.adoptPet(petId).subscribe(pet => {
      this.router.navigateByUrl('');
    });
  }

  like(pet) {
    pet.likes += 1;
    // console.log('Likes now ', pet.likes);
    const petId = pet._id;
    this._pet.likePet(petId, pet).subscribe(pet => {
      this.refresh();
      this.isDisabled = true;
    });
  }
}
