import { environment } from './../../environments/environment';
import { JwtService } from './jwt.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: Http,
                private jwt: JwtService) { }

  getRequest(url: string) {
    const completeUrl: string = environment.api_url + `${url}`;
    return this.http.get(completeUrl);
  }

  postRequest(url: string, obj: object) {
    return this.http.post(environment.api_url + `${url}`, obj);
  }

  putRequest(url: string, obj: object) {
    this.http.put(environment.api_url + `${url}`, obj);
  }

  deleteRequest(url: string, obj: object) {
    this.http.delete(environment.api_url + `${url}`);
  }
}
