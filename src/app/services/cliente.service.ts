import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from './rest.service';
import { Cliente } from '../interfaces/Cliente';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends RestService {

  constructor(private http: HttpClient){
    super();
  }

  registrar(cliente: Cliente){
    return this.http.post<Cliente>(this.baseUrl + '/clientes', cliente);
  }

}
