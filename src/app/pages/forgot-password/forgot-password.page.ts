import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/apiService';
import { Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { StorageService } from 'src/app/services/storageService';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private iab: InAppBrowser,
    private storageService: StorageService 
  ) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

   openForgot() {
    if (this.formGroup.valid) {
      const emailValue = this.formGroup.get('email')?.value;
      this.apiService
      .forgotServiceV2(emailValue)
      .subscribe(async (response) => {
        if (response) {
          let respString = JSON.stringify(response);

       
          //convierto string en json- ya que no permite acceder a 'cod' directamente
          let respLogin: any = JSON.parse(respString);
       
        if (respLogin.cod && respLogin.cod == '00') {
       //   await this.storageService.setItem('email', emailValue);
          await this.storageService.setItem('msg', respLogin.msg);

          this.router.navigate(['/forgot-code']);
          
         /*   this.iab.create(
              respLogin.msg,
              '_blank',
              'location=no,zoom=no,toolbar=no'
            );*/
            this.formGroup.reset();
          } else {
            alert(respLogin.msg)
          }
        }
      });


      /*this.apiService.forgotService(emailValue).subscribe((response) => {
        if (response) {
          //convierto respuesta en string
          let respString = JSON.stringify(response);

          //convierto string en json- ya que no permite acceder a 'cod' directamente
          let respLogin: any = JSON.parse(respString);

          if (respLogin.cod && respLogin.cod == '00') {
            alert('Le hemos enviado un email para reestablecer su contraseña.');
            this.router.navigate(['/home']);
          } else {
            if (respLogin.cod && respLogin.cod == '01') {
              alert('El email no ha sido registrado.');
            } else {
              alert('Ha ocurrido un error');
            }
          }
        }
      });*/
    }
  }
}
