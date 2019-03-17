import { Component, OnInit } from '@angular/core';
import { Pet } from '../models';
import { PetService } from '../services/pet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pets: any;
  constructor(
    private readonly _pet: PetService,
    private router: Router
  ) { }

  ngOnInit() {
    this._pet.getPets().subscribe(data => {
      console.log('Got our data ', data);
      this.pets = data['pets'];
    });
  }

  onClick(event: Event) {
    event.stopPropagation();
  }

  viewPet(p) {
    const petId = p._id;
    this.router.navigateByUrl('/pets/' + petId);
  }

  onClickE(event: Event) {
    event.stopPropagation();
  }

  editPet(p) {
    const petId = p._id;
    this.router.navigateByUrl('/pets/' + petId + '/edit');
  }

}
