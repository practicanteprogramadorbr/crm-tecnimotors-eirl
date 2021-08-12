import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import Mayorista from 'src/app/interfaces/Mayorista';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-m',
  templateUrl: './view-m.component.html',
  styleUrls: ['./view-m.component.css']
})
export class ViewMComponent implements OnInit {

  return: string = '/mayoristas';
  mayorista: Mayorista;
  loading: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private notifier: NotifierService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params.id;
      this.clienteService.buscarPorId(id).subscribe(mayorista => {
        this.mayorista = mayorista;
        console.log(this.mayorista);
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.details
        });
        this.go();
      });
    });
  }

  onStatusChange(new_status: number, message: string, type: string) {
    this.loading = true;
    const payload = Object.assign({}, this.mayorista);
    payload.estado_id = new_status;
    this.clienteService.actualizarDatos(payload.id, payload)
      .subscribe(resp => {
        this.loading = false;
        this.mayorista = resp;
        this.notifier.show({
          message,
          type,
        });
      }, err => {
        this.loading = false;
        this.notifier.show({
          message: 'Ocurrio un error. Notificar a soporte',
          type: 'error',
        });
      });
  }

  eliminar(cliente: Mayorista) {
    Swal.fire({
      title: 'Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          `El cliente ${cliente.nombres} ha sido eliminado`,
          'success'
        )
      }
    })
  }

  private go() {
    this.router.navigateByUrl(this.return);
  }

  isToday(fecha_nacimiento: Date) {
    let today = new Date();
    let date = new Date(fecha_nacimiento);
    return date.getDate() == today.getDate() &&
      date.getMonth() == today.getMonth() &&
      date.getFullYear() == today.getFullYear();
  }
}
