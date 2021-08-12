import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Departamento from 'src/app/interfaces/Departamento';
import Distrito from 'src/app/interfaces/Distrito';
import Mayorista from 'src/app/interfaces/Mayorista';
import Provincia from 'src/app/interfaces/Provincia';
import { ClienteService } from 'src/app/services/cliente.service';
import { DireccionService } from 'src/app/services/direccion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-m',
  templateUrl: './form-m.component.html',
  styleUrls: ['./form-m.component.css']
})
export class FormMComponent implements OnInit {

  return: string = '/mayoristas';
  form: FormGroup;
  departamentos: Departamento[];
  provincias: Provincia[]
  distritos: Distrito[];

  loading: boolean = false;
  isEditForm: boolean = false;
  mayorista_a_actualizar: Mayorista;

  constructor(private fb: FormBuilder,
    private direccionService: DireccionService,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.departamentos = [];
    this.provincias = [];
    this.distritos = [];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.form = this.createForm();
      this.listarDepartamentos();
      if (params.id) {
        this.clienteService.buscarPorId(params.id).subscribe((cliente: any) => {
          this.mayorista_a_actualizar = Object.assign({}, cliente);
          delete cliente.id;
          this.form.setValue(cliente);
          this.isEditForm = true;
        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.details
          });
          this.go();
        });
      }
    });
  }

  createForm() {
    return this.fb.group({
      nombres: this.fb.control('', Validators.required),
      ap_paterno: this.fb.control('', Validators.required),
      ap_materno: this.fb.control('', Validators.required),
      email: this.fb.control(''),
      razon_social: this.fb.control(''),
      ruc: this.fb.control(''),
      celular: this.fb.control('', Validators.required),
      telef_fijo: this.fb.control(''),
      direccion_cliente: this.fb.control('', Validators.required),
      departamento: this.fb.control('', Validators.required),
      provincia: this.fb.control('', Validators.required),
      distrito: this.fb.control('', Validators.required),
      fecha_nacimiento: this.fb.control(''),
      genero: this.fb.control('Masculino', Validators.required),
      complemento_direccion: this.fb.control(null),
      fecha_registro: this.fb.control(null),
      ciudad: this.fb.control(null),
      comentario_reg_cliente: this.fb.control(null),
      proteccion_datos: this.fb.control(true),
      estado_id: this.fb.control(null)
    });
  }

  listarDepartamentos() {
    this.direccionService.getDepartamentos().subscribe(departamentos => {
      this.departamentos = departamentos;
    });
  }

  listarProvincias(select: any) {
    let selectedOption = select.options[select.selectedIndex];
    let departamento_id = selectedOption.getAttribute('id');
    if (!departamento_id) {
      this.getControl('provincia').reset("");
      this.getControl('distrito').reset("");
      this.provincias = [];
      this.distritos = [];
      return;
    };
    this.direccionService.getProvincias(departamento_id).subscribe(provincias => {
      this.getControl('provincia').reset("");
      this.provincias = provincias;
      this.distritos = [];
    });
  }

  listarDistritos(select: any) {
    let selectedOption = select.options[select.selectedIndex];
    let provincia_id = selectedOption.getAttribute('id');
    if (!provincia_id) {
      this.getControl('distrito').reset("");
      this.distritos = [];
      return;
    };
    this.direccionService.getDistritos(provincia_id).subscribe(distritos => {
      this.getControl('distrito').reset("");
      this.distritos = distritos;
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.isEditForm) {
      this.editar();
    } else {
      this.registrar();
    }
  }

  registrar() {
    this.loading = true;
    this.clienteService.registrar(this.form.value).subscribe(cliente => {
      this.loading = false;
      Swal.fire({
        icon: 'success',
        title: 'Registrado!',
        text: `El cliente ${cliente.nombres} ${cliente.ap_materno} fue registrado.`
      });
      this.go();
    }, (err) => {
      Swal.fire(
        'Oops...',
        'Ocurrio un error en la eliminación',
        'error'
      );
      console.log(err);
    });
  }

  editar() {
    this.loading = true;
    this.clienteService.actualizarDatos(this.mayorista_a_actualizar.id, this.form.value)
      .subscribe(cliente => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Actualizado!',
          text: `El cliente ${cliente.nombres} ${cliente.ap_materno} fue actualizado.`
        });
        this.router.navigateByUrl(this.return);
      }, err => {
        Swal.fire(
          'Oops...',
          'Ocurrio un error en la edición',
          'error'
        );
        console.log(err);
      });
  }

  getControl(name: string): AbstractControl {
    return this.form.get(name) as FormControl;
  }

  isInvalid(name: string) {
    const control = this.getControl(name);
    return (control.dirty || control.touched) && (control.invalid);
  }

  go() {
    this.router.navigateByUrl(this.return);
  }

}
