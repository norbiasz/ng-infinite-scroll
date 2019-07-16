import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, fromEvent, merge } from 'rxjs';

import { map, filter, debounceTime, distinct, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  itemHeight: number;
  numberOfItems: number;
  loading = false;

  pageByScroll$ = fromEvent(window, 'scroll')
  .pipe(
      map(() => window.scrollY),
      filter(current => current >=  document.body.clientHeight - window.innerHeight),
      debounceTime(500),
      distinct(),
      map(y => Math.ceil((y + window.innerHeight) / (this.itemHeight * this.numberOfItems)))
  );

  pageByResize$ = fromEvent(window, 'resize')
    .pipe(
      debounceTime(200),
      distinct(),
      map(() => Math.ceil(
        (window.innerHeight + document.body.scrollTop) / (this.itemHeight * this.numberOfItems)
      ))
    );
    
}
