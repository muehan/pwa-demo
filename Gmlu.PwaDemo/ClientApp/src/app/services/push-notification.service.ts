import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl + 'pushnotification';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  constructor(private http: HttpClient) { }

  public addSubscriber(subscription: PushSubscription): Observable<any> {
    console.log('[Push Subscription Service] Adding subscriber');

    if (subscription) {
      const sub = subscription.toJSON();

      const body = {
        action: 'subscribe',
        subscription: {
          endpoint: sub.endpoint,
          p256DH: sub.keys['p256dh'],
          auth: sub.keys['auth'],
        },
      };

      return this.http.post(baseUrl, body);
    }

    return null;
  }

  public deleteSubscriber(subscription: PushSubscription): Observable<any> {
    console.log('[Push Subscription Service] Deleting subscriber');

    if (subscription) {
      const sub = subscription.toJSON();

      const body = {
        action: 'unsubscribe',
        subscription: {
          endpoint: sub.endpoint,
          p256DH: sub.keys['p256dh'],
          auth: sub.keys['auth'],
        },
      };

      return this.http.post(baseUrl, body);
    }

    return null;
  }

  public pushTestmessage(): Observable<any> {
    return this.http.get(baseUrl);
  }
}
