import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  constructor(private http: HttpClient) { }

  getProviders() {
    return this.http.get('http://localhost:4000/proveedores');
  }

}
