import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import Multi from '../interfaces/Multi';
import Serie from '../interfaces/Serie';
import { RestService } from './rest.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends RestService {

  constructor(private http: HttpClient) {
    super();
  }

  getEstadisticas() {
    let response1 = this.http.get(this.baseUrl + '/estadisticas/cantidad-clientes');
    let response2 = this.http.get(this.baseUrl + '/estadisticas/clientes-hoy');
    return forkJoin([response1, response2]);
  }

  getVistaGeneralMayoristas(anio: number): Observable<Multi[]> {
    return this.http.get<Serie[]>(this.baseUrl + `/estadisticas/vista-general-mayoristas/${anio}`).pipe(
      map((data: Serie[]) => {
        const parsedData = this.parseGraficaGeneralData(data);
        return parsedData;
      })
    )
  }

  private parseGraficaGeneralData(data: Serie[]): Multi[] {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
      'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    let multi: Multi = {
      name: "Mayoristas",
      series: []
    }
    data.forEach(record => {
      let i = Number(record.name);
      let pref = months[i - 1].slice(0, 3);
      const serie: Serie = {
        name: pref,
        value: record.value
      }
      multi.series.push(serie);
    });
    return [multi];
  }

}
