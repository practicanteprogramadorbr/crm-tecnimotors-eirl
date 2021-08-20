import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bicicleta } from '../interfaces/Bicicleta';
import Fuente from '../interfaces/Fuente';
import { Moto } from '../interfaces/Moto';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService extends RestService {

  constructor(private http: HttpClient) {
    super();
  }

  obtenerFuentes() {
    return this.http.get<Fuente[]>(this.baseUrl + '/fuentes');
  }

  obtenerMotos(){
    return this.http.get<Moto[]>(this.baseUrl + '/motos');
  }

  obtenerBicicletas(){
    return this.http.get<Bicicleta[]>(this.baseUrl + '/bicicletas');
  }

}
