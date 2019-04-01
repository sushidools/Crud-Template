import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './home/edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { ReviewComponent } from './review/review.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', redirectTo: 'restaurants', pathMatch: 'full' },
      { path: 'restaurants', component: HomeComponent },
      { path: 'restaurants/:id/edit', component: EditComponent },
      { path: 'restaurants/new', component: NewComponent },
      { path: 'restaurants/:id', component: DetailsComponent },
      { path: 'restaurants/:id/review', component: ReviewComponent },
      { path: '**', component: PageNotfoundComponent },
    ],
  },
];
