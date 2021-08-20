import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Mayorista from 'src/app/interfaces/Mayorista';
import { ClienteService } from 'src/app/services/cliente.service';
import { MayoristaService } from 'src/app/services/mayorista.service';

@Component({
  selector: 'app-list-m',
  templateUrl: './list-m.component.html',
  styleUrls: ['./list-m.component.css']
})
export class ListMComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  mayoristas: Mayorista[] = [];

  constructor(private mayoristaService: MayoristaService) { }

  ngOnInit(): void {
    this.listar();
    this.recibir();
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  listar() {
    this.sub1 = this.mayoristaService.listar().subscribe((mayoristas) => {
      this.mayoristas = mayoristas;
    });
  }

  recibir() {
    this.sub2 = this.mayoristaService.recibir$().subscribe((mayorista: Mayorista) => {
      this.mayoristas.unshift(mayorista);
    });
  }

}
