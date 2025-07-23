import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FCMService {

 private readonly firebaseApiUrl = environment.firebaseApiUrl;
  private readonly serverKey = environment.serverKey;
  constructor(private http: HttpClient) { }

  subscribeToTopic(topic: string, token: string) {
    const body = {
      to: `/topics/${topic}`,
      registration_tokens: [token]
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `key=${this.serverKey}`
    };

    return this.http.post(this.firebaseApiUrl, body, { headers });
  }
}