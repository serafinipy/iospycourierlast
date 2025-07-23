import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../services/apiService';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  currentStep = 1;
  formGroup1: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  // formGroup: FormGroup;
  branchesOffices: any = null;
  locationsData: any = null;
  countries: any;
  departments: any = null;
  cities: any = null;
  recommended: any = null;
  prefixes: any = null;
  selectedDeparment: string | null = null;
  selectedDepartment: string | null = null;
  selectedCountry: string | null = null;

  selectedDate2: string = ''; // Variable para almacenar la fecha seleccionada
  prevDate: string = ''; // Variable para almacenar el valor previo

  selectedDate: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private iab: InAppBrowser,
    private modalController: ModalController
  ) {
    this.formGroup1 = this.createFormGroup1();
    this.formGroup2 = this.createFormGroup2();
    this.formGroup3 = this.createFormGroup3();
    /*

    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      nro_document: ['', [Validators.required]],      
      birthdate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      department: ['', [Validators.required]],
      recommended: ['', [Validators.required]],
      direction: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      prefix: ['', [Validators.required]],
      cell_phone: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      ruc: ['', [Validators.required]],
      business_name: ['', [Validators.required]],

      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: [
        '',
        [Validators.required, this.passwordMatchValidator.bind(this)],
      ],
    });*/
    /*
    // Agregamos confirm_password después de que se define password
    this.formGroup.addControl(
      'confirm_password',
      new FormControl('', Validators.required)
    );
    this.formGroup
      .get('confirm_password')
      ?.setValidators([
        Validators.required,
        this.passwordMatchValidator.bind(this)
      ]);  */
  }

  async ngOnInit() {
    try {
      this.getBranchOffices();
      this.recommendedBy();
      this.getCountries();
      this.getPrefixes();
      //   this.registrarUsuario()
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  }

  onNextStep(step: number) {
    this.currentStep = step;
  }

  onPreviousStep(step: number) {
    this.currentStep = step;
  }

  onBirthdateChange(event: CustomEvent) {
    // Aquí puedes manejar el cambio de fecha de nacimiento
    const nuevaFecha = event.detail.value;
    /*console.log('Nueva fecha de nacimiento:', nuevaFecha);
    console.log(typeof nuevaFecha);*/
    // Puedes hacer cualquier acción que necesites con la nueva fecha aquí
  }

  openRegister() {
    let token: any = '';
    if (
      this.formGroup1.valid &&
      this.formGroup2.valid &&
      this.formGroup3.valid
    ) {
      if (localStorage.getItem('tokenFCM')) {
        token = localStorage.getItem('tokenFCM');
      } /*
        this.apiService
          .registerServiceV2(
            this.formGroup1.get('name')?.value,
            this.formGroup1.get('lastname')?.value,
            this.formGroup1.get('nro_document')?.value,
            this.formGroup1.get('birthdate')?.value,
            this.formGroup2.get('email')?.value,
            this.formGroup1.get('password')?.value,
            this.formGroup2.get('direction')?.value,
            this.formGroup2.get('prefix')?.value,
            this.formGroup2.get('cell_phone')?.value.toString(),
            this.formGroup3.get('business_name')?.value,
            this.formGroup3.get('ruc')?.value,
            this.formGroup2.get('branch')?.value,
            this.formGroup2.get('country')?.value,
            this.formGroup2.get('department')?.value,
            this.formGroup2.get('city')?.value,
            this.formGroup3.get('recommended')?.value,
            token
          )
          .subscribe((response) => {
            if (response) {
              let respString = JSON.stringify(response);
              
              //convierto string en json- ya que no permite acceder a 'cod' directamente
              let respRegister: any = JSON.parse(respString);
              
              if (respRegister.cod && respRegister.cod == '00') {
          
                this.formGroup1.reset();
                this.formGroup2.reset();
                this.formGroup3.reset();
                this.iab.create(
                  respRegister.msg,
                  '_blank',
                  'location=no,zoom=no,toolbar=no,clearsessioncache=yes,clearcache=yes'
                );
              } else {
                alert(respRegister.msg);
              }
            }
          });*/

      const data = {
        a: 'registerv2',
        nombre: this.formGroup1.get('name')?.value, //'Eduardo test',
        apellido: this.formGroup1.get('lastname')?.value, //'Alvarez test',
        nro_documento: this.formGroup1.get('nro_document')?.value, //'1682367101',

        fecha_nacimiento: this.formGroup1.get('birthdate')?.value, //'1981-04-24',//'1981-04-24',

        email: this.formGroup2.get('email')?.value, //'eduardoalvarez+008@gmail.com',
        password: this.formGroup1.get('password')?.value, //'asd123',
        direccion: this.formGroup2.get('direction')?.value, //'Concejal Vargas 541 casi Bertoni',

        prefijo: this.formGroup2.get('prefix')?.value, //'595',
        celular: this.formGroup2.get('cell_phone')?.value,//'985826458',

        razon_social: this.formGroup3.get('business_name')?.value, //'Eduardo Alvarez Ketterer',

        ruc: this.formGroup3.get('ruc')?.value,//'1682367-2',
        retirar_de: this.formGroup2.get('branch')?.value,//'VM',

        pais: this.formGroup2.get('country')?.value, //'Paraguay',
        departamento: this.formGroup2.get('department')?.value, //'Asunción',
        ciudad: this.formGroup2.get('city')?.value, //'Asunción',
        recomendado: this.formGroup3.get('recommended')?.value, //'Web',

        token: token,
      };

      //console.log(typeof this.formGroup2.get('prefix')?.value)
   //   console.log(data, 'data');

      this.apiService.registrarUsuario(data).subscribe(
        (response) => {
       //   console.log('Usuario registrado exitosamente:', response);
          
          let respString = JSON.stringify(response);

          //convierto string en json- ya que no permite acceder a 'cod' directamente
          let respRegister: any = JSON.parse(respString);

          /*console.log(respRegister,'respRegister');
          console.log(respRegister.cod,'respRegister.cod');*/
          if(respRegister?.cod=='00'){
            this.iab.create(
              respRegister.msg,
              '_blank',
              'location=no,zoom=no,toolbar=no,clearsessioncache=yes,clearcache=yes'
            );
          }else{
            alert(respRegister?.msg);
          }

          
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
       
        }
      );
    } else {
      console.log('formulario no valido ');
    }
  }

  private createFormGroup1(): FormGroup {
    const formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      nro_document: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: [
        '',
        [Validators.required, this.passwordMatchValidator.bind(this)],
      ],
    });

    // Agregar confirm_password después de que se define password
    formGroup.addControl(
      'confirm_password',
      this.formBuilder.control('', Validators.required)
    );
    formGroup
      .get('confirm_password')
      ?.setValidators([
        Validators.required,
        this.passwordMatchValidator.bind(this),
      ]);

    return formGroup;
  }

  private createFormGroup2(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      branch: ['', [Validators.required]],
      country: ['', [Validators.required]],
      department: ['', [Validators.required]],
      city: ['', [Validators.required]],
      direction: ['', [Validators.required]],
      //phone: ['', [Validators.required]],
      prefix: ['', [Validators.required]],
      cell_phone: ['', [Validators.required]],
    });
  }

  private createFormGroup3(): FormGroup {
    return this.formBuilder.group({
      ruc: ['', [Validators.required]],
      business_name: ['', [Validators.required]],
      recommended: ['', [Validators.required]],
      acceptTerms: [false, Validators.requiredTrue],
      phone: ['', []],
    });
  }

  async getBranchOffices() {
    try {
      const resp = await this.apiService.branchOffices();

      if (resp) {
        //   let branches = JSON.parse(JSON.stringify(resp));
        this.branchesOffices = resp;
      }
    } catch (err) {
      console.log(err, 'err');
    }
  }

  async getCountries() {
    try {
      const resp = await this.apiService.getCountries();

      if (resp) {
        this.countries = resp;
      }
    } catch (err) {
      this.countries = null;
    }
  }

  async recommendedBy() {
    try {
      const resp = await this.apiService.getRecomendedBy();

      if (resp) {
        //   let branches = JSON.parse(JSON.stringify(resp));
        this.recommended = resp;
      }
    } catch (err) {
      console.log(err, 'err');
    }
  }

  async getPrefixes() {
    try {
      const resp = await this.apiService.getPrefix();

      if (resp) {
        //   let branches = JSON.parse(JSON.stringify(resp));
        this.prefixes = resp;
      }
    } catch (err) {
      console.log(err, 'err');
    }
  }

  async onCountryChange(country: string) {
    try {
      this.selectedCountry = country;
      const resp = await this.apiService.getDepartments(country);

      if (resp) {
        this.departments = resp;
      }
    } catch (err) {
      console.log(err, 'err');
    }
  }

  async onDepartmentChange(department: string) {
    try {
      this.selectedDepartment = department;
      if (this.selectedCountry != null) {
        const resp = await this.apiService.getCities(
          this.selectedCountry,
          department
        );

        if (resp) {
          this.cities = resp;
        } else {
          console.log('resp no existe');
        }
      }
    } catch (err) {
      console.log(err, 'err');
    }
  }

  // Función de validación personalizada para verificar si las contraseñas coinciden
  passwordMatchValidator(control: FormControl): { [key: string]: any } | null {
    if (!this.formGroup1) {
      return null; // O maneja el caso de que formGroup no esté definido
    }

    const password: string = this.formGroup1.get('password')?.value;
    const confirmPassword: string = control.value;

    if (password !== confirmPassword) {
      return { mismatch: true };
    }
    return null;
  }

  registrarUsuario() {
    const datos = {
      a: 'registerv2',
      nombre: 'Eduardo test',
      apellido: 'Alvarez test',
      nro_documento: '1682367100',
      fecha_nacimiento: '1981-04-24',
      email: 'eduardoalvarez+007@gmail.com',
      password: 'asd123',
      direccion: 'Concejal Vargas 541 casi Bertoni',
      prefijo: '595',
      celular: '985826458',
      razon_social: 'Eduardo Alvarez Ketterer',
      ruc: '1682367-2',
      retirar_de: 'VM',
      pais: 'Paraguay',
      departamento: 'Asunción',
      ciudad: 'Asunción',
      recomendado: 'Web',
      token: 'asd123',
    };

    this.apiService.registrarUsuario(datos).subscribe(
      (response) => {
        console.log('Usuario registrado exitosamente:', response);
        // Realizar cualquier acción adicional después de registrar el usuario
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
        // Manejar el error apropiadamente
      }
    );
  }
}
