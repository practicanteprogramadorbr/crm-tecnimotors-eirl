import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Departamento from 'src/app/interfaces/Departamento';
import Distrito from 'src/app/interfaces/Distrito';
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
    this.form = this.createForm();
    this.listarDepartamentos();
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
      proteccion_datos: this.fb.control(true)
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

  registrar(e: Event) {
    e.preventDefault();
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
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
