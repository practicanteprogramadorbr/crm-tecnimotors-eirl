import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Departamento from 'src/app/interfaces/Departamento';
import Distrito from 'src/app/interfaces/Distrito';
import Fuente from 'src/app/interfaces/Fuente';
import Mayorista from 'src/app/interfaces/Mayorista';
import Provincia from 'src/app/interfaces/Provincia';
import { DireccionService } from 'src/app/services/direccion.service';
import { GeneralService } from 'src/app/services/general.service';
import { MayoristaService } from 'src/app/services/mayorista.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-m',
  templateUrl: './form-m.component.html',
  styleUrls: ['./form-m.component.css']
})
export class FormMComponent implements OnInit, OnDestroy {

  return: string = '/mayoristas';
  form: FormGroup;
  departamentos: Departamento[];
  provincias: Provincia[]
  distritos: Distrito[];
  fuentes: Fuente[];

  loading: boolean = false;
  isEditForm: boolean = false;
  mayorista: Mayorista;

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  sub5: Subscription;
  sub6: Subscription;
  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder,
    private direccionService: DireccionService,
    private mayoristaService: MayoristaService,
    private generalService: GeneralService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.departamentos = [];
    this.provincias = [];
    this.distritos = [];
    this.fuentes = [];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe()
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.form = this.createForm();
      this.obtenerFuentes();
      this.listarDepartamentos();
      if (params.id) {
        this.mayoristaService.buscarPorId(params.id).subscribe((cliente: any) => {
          this.mayorista = Object.assign({}, cliente);
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
      id: this.fb.control(''),
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
      estado_id: this.fb.control(1), // Pendiente = 1; Valor Predeterminado
      fuente_id: this.fb.control(null, Validators.required),
      vendedor_id: this.fb.control(null)
    });
  }

  listarDepartamentos() {
    this.sub1 = this.direccionService.getDepartamentos().subscribe(departamentos => {
      this.departamentos = departamentos;
    });
    this.subscriptions.push(this.sub1);
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
    this.sub2 = this.direccionService.getProvincias(departamento_id).subscribe(provincias => {
      this.getControl('provincia').reset("");
      this.provincias = provincias;
      this.distritos = [];
    });
    this.subscriptions.push(this.sub2);
  }

  listarDistritos(select: any) {
    let selectedOption = select.options[select.selectedIndex];
    let provincia_id = selectedOption.getAttribute('id');
    if (!provincia_id) {
      this.getControl('distrito').reset("");
      this.distritos = [];
      return;
    };
    this.sub3 = this.direccionService.getDistritos(provincia_id).subscribe(distritos => {
      this.getControl('distrito').reset("");
      this.distritos = distritos;
    });
    this.subscriptions.push(this.sub3);
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
    this.sub5 = this.mayoristaService.registrar(this.form.value).subscribe(cliente => {
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
    this.subscriptions.push(this.sub5);
  }

  editar() {
    this.loading = true;
    this.sub6 = this.mayoristaService.actualizarDatos(this.mayorista.id, this.form.value)
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
    this.subscriptions.push(this.sub6);
  }

  obtenerFuentes() {
    this.sub4 = this.generalService.obtenerFuentes().subscribe(fuentes => {
      this.fuentes = fuentes;
    });
    this.subscriptions.push(this.sub4);
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
