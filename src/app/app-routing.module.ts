import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanetComponent } from './planet/planet.component';
import { PeopleComponent } from './people/people.component';

const routes: Routes = [

  {
    path: 'people',
    component: PeopleComponent
  },

  {
    path: 'planets',
    component: PlanetComponent
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
