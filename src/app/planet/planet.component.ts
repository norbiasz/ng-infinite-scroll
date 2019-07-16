import { Component, OnInit } from '@angular/core';
import { merge, BehaviorSubject, Observable } from 'rxjs';
import { distinct, filter, map, debounceTime, tap, concatMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html'
})
export class  PlanetComponent implements OnInit {

  constructor(private httpClient: HttpClient, private scrollService: ScrollService) {}

  itemResultsPlanet$: Observable<Array<any>>;
  pageToLoad$: Observable<any>;
  pageByManual$ = new BehaviorSubject(1);
  cache = [];
  itemHeight: number = 44;
  numberOfItems: number = 10;

  ngOnInit() {

    console.log('--> tab planet');

    this.scrollService.itemHeight = this.itemHeight;
    this.scrollService.numberOfItems = this.numberOfItems;

    this.pageToLoad$ = merge(this.pageByManual$, this.scrollService.pageByScroll$, this.scrollService.pageByResize$)
    .pipe(
      distinct(),
      filter(page => this.cache[page - 1] === undefined),
      tap((data) => console.log('page: ', data)),
    );

    this.itemResultsPlanet$ = this.pageToLoad$
    .pipe(
      tap(() => this.scrollService.loading = true),
      concatMap((page: number) => {
        return this.httpClient.get(`https://swapi.co/api/planets?page=${page}`)
          .pipe(
            distinct(),
            map((resp: any) => resp.results),
            tap(resp => {
              this.cache[page - 1] = resp;
              if ((this.scrollService.itemHeight * this.scrollService.numberOfItems * page) < window.innerHeight) {
                this.pageByManual$.next(page + 1);
              }
            })
          );
      }),
      map(() => [].concat.apply([], this.cache))
    );
  }
}
