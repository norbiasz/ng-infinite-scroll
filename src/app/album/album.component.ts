import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, OnChanges, AfterContentInit, DoCheck } from '@angular/core';
import { InfiniteScrollEvent } from 'ngx-infinite-scroll';
import { Utils } from '../lib/utils.class';
import { Observable } from 'rxjs';
import { Album } from '../models/album.interface';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.sass']
})
export class AlbumComponent implements OnInit, OnDestroy, DoCheck {

  allAlbums$: Observable<Array<Album>>;
  private pageNumber = 0;
  private pageSize = 20;
  isActiveAlbum: boolean

  constructor(private httpService: HttpService, private router: Router) { }

  ngDoCheck() {

  }

  ngOnInit() {
    this.isActiveAlbum = true; 
    console.log('albums', this.isActiveAlbum);
  }

  ngOnDestroy() {
    this.isActiveAlbum = false; 
    console.log('albums', this.isActiveAlbum);
  }


  getAlbums() {
    console.log('albumy:');
    this.allAlbums$ = this.httpService.getAlbums(this.getFilters(this.pageNumber++));
  }

  getFilters(pageNo: number) {
    let params = '';
    params = Utils.addToQueryParams(params, '_start', pageNo);
    params = Utils.addToQueryParams(params, '_limit', this.pageSize);
    return params;
  }

  scrollAlbums() {
    if(this.router.url === '/albumy') {
      this.getAlbums();
    }
  }
}
