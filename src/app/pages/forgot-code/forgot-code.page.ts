import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { ApiService } from '../../services/apiService';
import { Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { StorageService } from 'src/app/services/storageService';

@Component({
  selector: 'app-forgot-code',
  templateUrl: './forgot-code.page.html',
  styleUrls: ['./forgot-code.page.scss'],
})
export class ForgotCodePage implements OnInit {
 formGroup: FormGroup;
 msg: string='';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private iab: InAppBrowser,
    private storageService: StorageService
  ) {
    this.formGroup = this.formBuilder.group({
      code: ['', [Validators.required,this.codeMatchValidator()]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: [
        '',
        [Validators.required, this.passwordMatchValidator.bind(this)],
      ],
    });
  }

 async ngOnInit() {
  //this.msg = await this.storageService.getItem('email');
    this.msg = await this.storageService.getItem('msg');
    this.formGroup.get('code')?.updateValueAndValidity();
    
  }

  openForgot() {
    if (this.formGroup.valid) {
      const codeValue = this.formGroup.get('code')?.value;
      const passwordValue = this.formGroup.get('password')?.value;
      this.apiService
      .sendCodeForgot(codeValue, passwordValue)
      .subscribe((response) => {
        if (response) {
          let respString = JSON.stringify(response);

          //convierto string en json- ya que no permite acceder a 'cod' directamente
          let respLogin: any = JSON.parse(respString);
          

          if (respLogin.cod && respLogin.cod == '00') {
          
           /* this.iab.create(
              respLogin.msg,
              '_blank',
              'location=no,zoom=no,toolbar=no'
            );*/
             this.formGroup.reset();
             this.storageService.removeItem('msg')
            alert('La contraseña ha sido cambiada exitosamente')
            this.router.navigate(['/home']);
          } else {
            alert(respLogin.msg)
          }
        }
      });


    }
  }

    // Función de validación personalizada para verificar si las contraseñas coinciden
    passwordMatchValidator(control: FormControl): { [key: string]: any } | null {
      if (!this.formGroup) {
        return null; // O maneja el caso de que formGroup no esté definido
      }
  
      const password: string = this.formGroup.get('password')?.value;
      const confirmPassword: string = control.value;
  
      if (password !== confirmPassword) {
        return { mismatch: true };
      }
      return null;
    }

    
  // Función de validación personalizada para verificar si el código es igual a this.msg
  codeMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const code = control.value;
      if (this.msg && code !== this.msg) {
        return { codeMismatch: true };
      }
      return null;
    };
  }
}
