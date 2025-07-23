import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/apiService';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  formGroup: FormGroup;
  passwordFieldType: string = 'password';
  eyeIcon: string = 'eye-off';

  user = {
    email: '',
    password: ''
  }
 
credentials:any;
  @ViewChild('passwordInput') passwordInputRef!: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public alertController: AlertController,
    private iab: InAppBrowser,
    public router: Router,
  ) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  async ngOnInit(){
    
   // const credentials = await this.credentialsService.getCredentials();
   
    //this.checkCredentials();
   // this.presentAlert2()
  }

  ionViewDidEnter() {
    this.checkCredentials();
  }


  async onLogin() {
    if (this.formGroup.valid) {
      const emailValue = this.formGroup.get('email')?.value;
      const passwordValue = this.formGroup.get('password')?.value;
      this.apiService
        .loginService(emailValue, passwordValue)
        .subscribe((response) => {
          if (response) {
            //convierto respuesta en string
            let respString = JSON.stringify(response);

            //convierto string en json- ya que no permite acceder a 'cod' directamente
            let respLogin: any = JSON.parse(respString);

            if (respLogin.cod && respLogin.cod == '00') {
              //  this.iab.create(JSON.stringify(response.msg),_blank','location=no,zoom=no,toolbar=no');
             // this.credentialsService.saveCredentials(emailValue,passwordValue)
              this.credentials= { email: emailValue, password: passwordValue }
             localStorage.setItem('credentials', JSON.stringify(this.credentials));
              this.iab.create(
                respLogin.msg,
                '_blank',
                'location=no,zoom=no,toolbar=no'
              );
            } else {
              alert('Error en usuario o contraseña.');
            }
          }
        });
    }
  }

  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
    this.eyeIcon =
      this.eyeIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  async checkCredentials() {
    try {
        const credentialsString = localStorage.getItem('credentials');

        if (credentialsString) {
            const parsedCredentials = JSON.parse(credentialsString);
            if (parsedCredentials) {
                this.credentials = parsedCredentials;
                //this.presentAlert(parsedCredentials);
                //this.presentAlert2(parsedCredentials);
                this.apiService
                .loginService(parsedCredentials.email, parsedCredentials.password)
                .subscribe((response) => {
                  if (response) {
                    let respString = JSON.stringify(response);
                    let respLogin: any = JSON.parse(respString);
                    if (respLogin.cod && respLogin.cod == '00') {
                      this.iab.create(
                        respLogin.msg,
                        '_blank',
                        'location=no,zoom=no,toolbar=no'
                      );
                    }
                  }
                });
            } else {
                alert('Las credenciales en localStorage no son válidas.');
            }
        } else {
            console.error('No se encontraron credenciales en localStorage.');
        }
    } catch (error) {
        console.error('Error al analizar las credenciales:', error);
    }
}


  async presentAlert(credentials:any) {

    const alert = await this.alertController.create({
      subHeader: 'Acceder como ',
      message: this.user.email,
      buttons: [
        {
          text: 'SI',
          role: 'si',
          cssClass: 'secondary',
          handler: () => {
            this.apiService
            .loginService(credentials.email, credentials.password)
            .subscribe((response) => {
              if (response) {
                //convierto respuesta en string
                let respString = JSON.stringify(response);
    
                //convierto string en json- ya que no permite acceder a 'cod' directamente
                let respLogin: any = JSON.parse(respString);
    
                if (respLogin.cod && respLogin.cod == '00') {
                  //  this.iab.create(JSON.stringify(response.msg),_blank','location=no,zoom=no,toolbar=no');
                  this.iab.create(
                    respLogin.msg,
                    '_blank',
                    'location=no,zoom=no,toolbar=no'
                  );
                } 
              }
            });
          }
        },
        {
          text: 'NO',
          role: 'no',
          cssClass: 'secondary',
          handler: async () => {
            await alert.dismiss(); // Cerrar el alert
         
          }
        }
      ]
    });
}

async presentAlert2(parsedCredentials: any) {
  const alert = await this.alertController.create({
   // header: 'Acceder como',
    subHeader: '¿Desea acceder como '+parsedCredentials.email+' ?',
  //  message: 'hola',
    buttons: [
      {
        text: 'SI',
        handler: () => {
          this.apiService
            .loginService(parsedCredentials.email, parsedCredentials.password)
            .subscribe((response) => {
              if (response) {
                let respString = JSON.stringify(response);
                let respLogin: any = JSON.parse(respString);
                if (respLogin.cod && respLogin.cod == '00') {
                  this.iab.create(
                    respLogin.msg,
                    '_blank',
                    'location=no,zoom=no,toolbar=no'
                  );
                }
              }
            });
        }
      },
      {
        text: 'NO',
        handler: () => {
          localStorage.removeItem('credentials')
           alert.dismiss(); // Cerrar el alert
          // Hacer lo que necesites si el usuario presiona NO
        }
      }
    ]
  });

  await alert.present();
}

}
