import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  total_mayoristas: number = 0;

  constructor(private dshService: DashboardService) { }

  ngOnInit(): void {
    this.getVistaGeneralMayoristas();
    this.getEstadisticas();
  }

  getVistaGeneralMayoristas() {
    this.dshService.getVistaGeneralMayoristas(2021).subscribe(data => {
      this.multi = data;
    });
  }

  getEstadisticas(){
    this.dshService.getEstadisticas().subscribe(response => {
      this.total_mayoristas = Number(response[0]);
    });
  }

   // Configuration Grafica Mayoristas - WEB

   

    // Configuracion Gráfica General de Mayoristas

    multi: any[] = [];
    showLabels: boolean = true;
    animations: boolean = true;
    xAxis: boolean = true;
    yAxis: boolean = true;
    showYAxisLabel: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = 'Meses';
    yAxisLabel: string = 'Registrados';
    timeline: boolean = true;
  
    colorScheme = {
      domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
    };

}
