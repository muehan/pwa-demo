import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://localhost:5001/api/pushnotification';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  constructor(private http: HttpClient) {}

  public addSubscriber(subscription: PushSubscription): Observable<any> {
    console.log('[Push Subscription Service] Adding subscriber');

    const sub = subscription.toJSON();
    console.log(subscription);
    console.log(sub);

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

  public deleteSubscriber(subscription: PushSubscription): Observable<any> {
    console.log('[Push Subscription Service] Deleting subscriber');

    const body = {
      action: 'unsubscribe',
      subscription
    };

    return this.http.post(baseUrl, body);
  }

  public pushTestmessage(): Observable<any> {
    return this.http.get(baseUrl);
  }
}
