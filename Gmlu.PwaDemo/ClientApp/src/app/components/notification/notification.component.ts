import { VapidService } from './../../services/vapid.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PushNotificationService } from '../../services/push-notification.service';
import { take } from 'rxjs/operators';
import { MessageModel } from './message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  private VAPID_PUBLIC_KEY: string;
  private snackBarDuration = 2000;
  private subscriptionSubscription: Subscription;
  private notificationSubscription: Subscription;
  private messageSubscription: Subscription;

  constructor(
    private swPush: SwPush,
    private pushSubscriptionService: PushNotificationService,
    private vapidservice: VapidService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {

    this.vapidservice
      .get()
      .subscribe(x => {
        this.VAPID_PUBLIC_KEY = x.publicKey;
      });
  }

  ngOnDestroy() {
    if (this.subscriptionSubscription) { this.subscriptionSubscription.unsubscribe() }
    if (this.notificationSubscription) { this.notificationSubscription.unsubscribe() }
    if (this.messageSubscription) { this.messageSubscription.unsubscribe() }
  }

  public subscribeToPush(): void {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(pushSubscription => {
        this.subscriptionSubscription = this.pushSubscriptionService
          .addSubscriber(
            pushSubscription)
          .subscribe(
            res => {
              console.log('[Push Subscription] Add subscriber request answer');
              console.log(res);

              const snackBarRef = this.snackBar.open(
                'Now you are subscribed',
                null,
                {
                  duration: this.snackBarDuration
                }
              );

              this.notificationSubscription = this.swPush
                .messages
                .subscribe(message => {
                  console.log(message);

                  const msg: MessageModel = <MessageModel>message;
                  const snackBarRef = this.snackBar.open(
                    'Message from the server: ' + msg.Msg,
                    null,
                    {
                      duration: 5000
                    }
                  );
                });
            },
            err => {
              console.log(
                '[Push Subscription] Add subscriber request failed',
                err
              );
            }
          );
      })
      .catch(err => {
        console.error(err);
      });
  }

  public unsubscribeFromPush(): void {
    // Get active subscription
    this.swPush.subscription.pipe(take(1)).subscribe(pushSubscription => {
      console.log('[Push Subscription] pushSubscription', pushSubscription);

      // Delete the subscription on the backend
      this.pushSubscriptionService.deleteSubscriber(pushSubscription).subscribe(
        res => {
          console.log(
            '[Push Subscription] Delete subscriber request answer',
            res
          );

          const snackBarRef = this.snackBar.open(
            'Now you are unsubscribed',
            null,
            {
              duration: this.snackBarDuration
            }
          );

          // Unsubscribe current client (browser)
          pushSubscription
            .unsubscribe()
            .then(success => {
              console.log(
                '[Push Subscription] Unsubscription successful',
                success
              );
            })
            .catch(err => {
              console.log('[Push Subscription] Unsubscription failed', err);
            });
        },
        err => {
          console.log(
            '[Push Subscription] Delete subscription request failed',
            err
          );
        }
      );
    });
  }

  public sendTestMessage(): void {
    this.messageSubscription = this.pushSubscriptionService.pushTestmessage().subscribe(x => console.log(x));
  }
}
