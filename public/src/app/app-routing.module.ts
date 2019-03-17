import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';

export const APP_ROUTES: Routes = [
  {
    path: '', component: AppComponent, children: [
      { path: '', redirectTo: 'pets', pathMatch: 'full' },
      { path: 'pets', component: HomeComponent },
      { path: 'pets/new', component: NewComponent },
      { path: 'pets/:id', component: DetailsComponent },
      { path: 'pets/:id/edit', component: EditComponent },
      { path: '**', component: PageNotfoundComponent }
    ]
  }
];
