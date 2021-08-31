import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interfaces/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.ToList();
  }

  ToList() {
    this.clienteService.ToList().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

}
