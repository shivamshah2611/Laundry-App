import { Component, ViewChildren, QueryList } from '@angular/core';
import {
  Platform,
  IonRouterOutlet,
  ModalController,
  NavController
} from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthenticationService } from './services/auth.service';
import { NetworkProvider } from './services/network.service';
import { Events } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  authenticated: boolean;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  public appPages = [
    {
      title: 'Home',
      url: '/members/home',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/members/profile',
      icon: 'contact'
    },
    {
      title: 'Orders',
      url: '/members/orders',
      icon: 'clipboard' //bookmark,
    },
    {
      title: 'Address Book',
      url: '/members/address-book',
      icon: 'book'
    },
    {
      title: 'About Us',
      url: '/members/about-us',
      icon: 'information-circle-outline'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalCtrl: ModalController,
    private navCtrl: NavController,
    public toastController: ToastController,
    private authService: AuthenticationService,
    private networkProvider: NetworkProvider,
    private events: Events,
    private network: Network,
    private loading: LoadingService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackOpaque();
      this.splashScreen.hide();
      this.authService.authenticationState.subscribe(state => {
        if (state) {
          this.authenticated = state;
          console.log(this.authenticated);
          this.navCtrl.navigateRoot(['members'], {
            animated: true,
            animationDirection: 'forward'
          });
        } else {
          this.authenticated = state;
          console.log(this.authenticated);
          this.navCtrl.navigateRoot(['pincode']);
        }
      });

      
      this.networkProvider.initializeNetworkEvents();

      this.events.subscribe('network:offline', () => {
        this.navCtrl.navigateRoot(['no-connection']);
      });

      this.events.subscribe('network:online', () => {
        this.authService.authenticationState.subscribe(state => {
          if (state) {
            this.authenticated = state;
            console.log(this.authenticated);
            this.navCtrl.navigateRoot(['members'], {
              animated: true,
              animationDirection: 'forward'
            });
          } else {
            this.authenticated = state;
            console.log(this.authenticated);
            this.navCtrl.navigateRoot(['pincode']);
          }
        });
      });
    });

    
  }
}
