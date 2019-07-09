import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, AfterContentInit, DoCheck } from '@angular/core';
import { InfiniteScrollEvent } from 'ngx-infinite-scroll';
import { Utils } from '../lib/utils.class';
import { Observable } from 'rxjs';
import { Post } from '../models/post.interface';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit, OnDestroy, DoCheck {

  allPosts$: Observable<Array<Post>>;
  private pageNumber = 0;
  private pageSize = 20;
  isActivePost: boolean

  constructor(private httpService: HttpService, private router: Router) { }

  ngDoCheck() {

  }

  ngOnInit() {
    this.isActivePost = true; 
    console.log('post', this.isActivePost);
  }

  ngOnDestroy() {
    this.isActivePost = false; 
    console.log('post', this.isActivePost);
  }

  
  getPosts() {
    console.log('posty:');
    this.allPosts$ = this.httpService.getPosts(this.getFilters(this.pageNumber++));
  }

  getFilters(pageNo: number) {
    let params = '';
    params = Utils.addToQueryParams(params, '_start', pageNo);
    params = Utils.addToQueryParams(params, '_limit', this.pageSize);
    return params;
  }

  scrollPosts() {
    if(this.router.url === '/posty') {
      this.getPosts();
    }
  }

}
