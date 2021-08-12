import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Mayorista from 'src/app/interfaces/Mayorista';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-list-m',
  templateUrl: './list-m.component.html',
  styleUrls: ['./list-m.component.css']
})
export class ListMComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  mayoristas: Mayorista[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.listar();
    this.recibir();
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  recibir() {
    this.sub2 = this.clienteService.recibir$().subscribe((mayorista: Mayorista) => {
      console.log(mayorista);
      this.mayoristas.unshift(mayorista);
    });
  }

  listar() {
    this.sub1 = this.clienteService.listar().subscribe((mayoristas) => {
      this.mayoristas = mayoristas;
    });
  }

}
