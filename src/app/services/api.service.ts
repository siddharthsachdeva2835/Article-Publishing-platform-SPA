import { environment } from './../../environments/environment';
import { JwtService } from './jwt.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: Http,
                private jwt: JwtService) { }

  getRequest(url: string, header: object = {}) {

    const completeUrl: string = environment.api_url + `${url}`;
    if (header) {
      return this.http.get(completeUrl, header);
    }
    return this.http.get(completeUrl);
  }

  postRequest(url: string, obj: object, header: object = {}) {
    const completeUrl: string = environment.api_url + `${url}`;
    console.log(completeUrl);
    console.log(header);

    if (header) {
      return this.http.post(completeUrl, obj, header);
    }
    return this.http.post(environment.api_url + `${url}`, obj);
  }

  putRequest(url: string, obj: object) {
    this.http.put(environment.api_url + `${url}`, obj);
  }

  deleteRequest(url: string, obj: object, header: object = {}) {
    const completeUrl: string = environment.api_url + `${url}`;
    if (header) {
      return this.http.delete(completeUrl, header);
    }
    this.http.delete(environment.api_url + `${url}`);
  }
}
