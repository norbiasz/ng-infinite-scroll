import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Post } from './models/post.interface';
import { Album } from './models/album.interface';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getPosts(filters: string): Observable<Array<Post>> {
    const params = new HttpParams({ fromString: filters });
    return this.http.get<Array<Post>>('https://jsonplaceholder.typicode.com/posts', { params });
  }

  getAlbums(filters: string): Observable<Array<Album>> {
    const params = new HttpParams({ fromString: filters });
    return this.http.get<Array<Album>>('https://jsonplaceholder.typicode.com/albums', { params });
  }


}
