import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Capacitor } from "@capacitor/core";
import { initializeApp } from "firebase/app";
import { FCMService } from './services/FCMService';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private fcmService: FCMService) {  
    this.initalizeApp()
    
  }

initalizeApp(){
    // Request permission to use push notifications
  PushNotifications.requestPermissions().then(result => {
    if (result.receive === 'granted') {
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();
    } else {
      // Show some error
    }
  });

  // Add listener for registration event
  PushNotifications.addListener('registration', (token: Token) => {
    if(token.value){
    //  console.log('Push registration success, token: ' + token.value);
      localStorage.setItem('tokenFCM', JSON.stringify(token.value));
    }else{
      localStorage.setItem('tokenFCM', 'not-permission-token-fcm');
    }
    
    
    // Llama al método para suscribirte al tema 'general' utilizando el token del dispositivo
    this.fcmService.subscribeToTopic('general', token.value).subscribe(() => {
     // console.log('Subscribed to topic: general');
    }, error => {
      console.error('Error subscribing to topic:', error);
    });
  });

  // Add listener for registration error event
  PushNotifications.addListener('registrationError', (error: any) => {
    console.error('Error on registration: ' + JSON.stringify(error));
  });

  // Add listener for push notification received event
  PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
   // console.log('Push received: ' + JSON.stringify(notification));
    // Handle received notification
  });

  // Add listener for push notification action performed event
  PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
  //  console.log('Push action performed: ' + JSON.stringify(notification));
    // Handle action performed on notification
  });

}

}
