import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  private isHandset: boolean;
  private handsetSubscription: Subscription;
  private installPromptEvent;

  public opened: boolean;
  public btnInstallDisabled = true;

  constructor(private breakpointObserver: BreakpointObserver) {
    window.addEventListener('beforeinstallprompt', event => {
      // Prevent Chrome <= 67 from automatically showing the prompt
      event.preventDefault();
      // Stash the event so it can be triggered later.
      this.installPromptEvent = event;
      // Update the install UI to notify the user app can be installed
      this.btnInstallDisabled = false;
    });
  }

  ngOnInit(): void {
    this.handsetSubscription = this.isHandset$.subscribe(
      x => (this.isHandset = x)
    );
  }

  ngOnDestroy(): void {
    this.handsetSubscription.unsubscribe();
  }

  public toggleSideBar(): void {
    this.opened = !this.opened;
  }

  public toggleSideBarIfMobile(): void {
    if (this.isHandset) {
      this.toggleSideBar();
    }
  }

  public install() {
    this.btnInstallDisabled = true;
    // Show the modal add to home screen dialog
    this.installPromptEvent.prompt();
    // Wait for the user to respond to the prompt
    this.installPromptEvent.userChoice.then(choice => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      // Clear the saved prompt since it can't be used again
      this.installPromptEvent = null;
    });
  }
}
