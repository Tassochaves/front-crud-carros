import { Carro } from './../models/carro';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api/carro";

  constructor() { }

  listAll(): Observable<Carro[]>{
    return this.http.get<Carro[]>(this.API+"/listAll");
  }

  findById(id: number): Observable<Carro>{
    return this.http.get<Carro>(this.API+"/findById/"+id);
  }

  save(carro: Carro): Observable<string>{
    return this.http.post<string>(this.API+"/save", carro, {responseType: 'text' as 'json'});
  }

  update(carro: Carro): Observable<string>{
    return this.http.post<string>(this.API+"/update/"+carro.id, carro, {responseType: 'text' as 'json'});
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }
}
