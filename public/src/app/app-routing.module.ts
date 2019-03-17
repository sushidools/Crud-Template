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
    path: 'pets', component: AppComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: '/new', component: NewComponent },
      { path: '/:id/edit', component: EditComponent },
      { path: '/:id', component: DetailsComponent },
      { path: '**', component: PageNotfoundComponent }
    ]
  },
  { path: '', redirectTo: 'pets', pathMatch: 'full'},
];
