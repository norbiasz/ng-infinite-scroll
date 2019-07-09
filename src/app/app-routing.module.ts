import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [

  {
    path: 'albumy',
    component: AlbumComponent
  },

  {
    path: 'posty',
    component: PostComponent
  },
 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
