import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Bicicleta } from 'src/app/interfaces/Bicicleta';
import Fuente from 'src/app/interfaces/Fuente';
import { Moto } from 'src/app/interfaces/Moto';
import { ClienteService } from 'src/app/services/cliente.service';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  subscriptions: Subscription[];
  finalesForm: FormGroup;
  fuentes: Fuente[] = [];
  motos: Moto[] = [];
  bicicletas: Bicicleta[] = [];
  return: string = '/clientes'

  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private generalService: GeneralService,
    private router: Router) {
    this.fuentes = [];
    this.motos = [];
    this.bicicletas = [];
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.finalesForm = this.createForm();
    this.obtenerFuentes();
    this.obtenerMotos();
    this.obtenerBicicletas();
  }

  createForm() {
    return this.fb.group({
      nombres: this.fb.control('', Validators.required),
      ap_paterno: this.fb.control('', Validators.required),
      ap_materno: this.fb.control('', Validators.required),
      nro_cotizacion: this.fb.control('', Validators.required),
      fecha_solicitud: this.fb.control('', Validators.required),
      celular: this.fb.control('', [Validators.required, Validators.maxLength(9)]),
      correo: this.fb.control(''),
      moto_id: this.fb.control(""),
      cantidad: this.fb.control(0),
      repuestos: this.fb.control(""),
      bicicleta_id: this.fb.control(""),
      fuente_id: this.fb.control("", Validators.required),
      estado_id: this.fb.control(1, Validators.required)
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.finalesForm.invalid) {
      this.finalesForm.markAllAsTouched();
      return;
    }
    this.registrar();
  }

  registrar() {
    this.sub4 = this.clienteService.registrar(this.finalesForm.value).subscribe(cliente => {
      Swal.fire({
        icon: 'success',
        title: 'Registrado!',
        text: `El cliente ${cliente.nombres} ${cliente.ap_materno} fue registrado.`
      });
      this.go();
    }, err => {
      Swal.fire(
        'Oops...',
        'Ocurrio un error en la eliminación',
        'error'
      );
    });
  }

  getControl(nombre: string): AbstractControl {
    return this.finalesForm.get(nombre) as FormControl;
  }

  obtenerFuentes() {
    this.sub1 = this.generalService.obtenerFuentes().subscribe(fuentes => {
      this.fuentes = fuentes;
    });
    this.subscriptions.push(this.sub1);
  }

  obtenerMotos() {
    this.sub2 = this.generalService.obtenerMotos().subscribe(motos => {
      this.motos = motos;
    });
    this.subscriptions.push(this.sub2);
  }

  obtenerBicicletas() {
    this.sub3 = this.generalService.obtenerBicicletas().subscribe(bicicletas => {
      this.bicicletas = bicicletas;
    });
    this.subscriptions.push(this.sub3);
  }

  isInvalid(name: string) {
    const control = this.getControl(name);
    return (control.dirty || control.touched) && (control.invalid);
  }

  go() {
    this.router.navigateByUrl(this.return);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
