import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Mayorista from '../interfaces/Mayorista';
import { RestService } from './rest.service';
import { SocketService } from './socket.service';
import Fuente from '../interfaces/Fuente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends RestService {

  constructor(private http: HttpClient,
            private socketService: SocketService) {
    super();
  }

  registrar(cliente: any) {
    return this.http.post<Mayorista>(this.baseUrl + '/mayoristas', cliente);
  }

  listar() {
    return this.http.get<Mayorista[]>(this.baseUrl + '/mayoristas');
  }

  recibir$() {
    return this.socketService.createObserver$('cliente:nuevo');
  }

  buscarPorId(id: number) {
    return this.http.get<Mayorista>(this.baseUrl + `/mayoristas/${id}`)
  }

  actualizarDatos(id: number, datos_actualizados: Mayorista) {
    return this.http.put<Mayorista>(this.baseUrl + `/mayoristas/${id}`, datos_actualizados);
  }

  obtenerFuentes(){
    return this.http.get<Fuente[]>(this.baseUrl + '/fuentes');
  }

}
