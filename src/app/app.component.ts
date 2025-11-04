import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule, MenuController, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { cart, menu, heart, star, cartOutline, searchOutline, search, 
  logOutOutline, personOutline,listOutline, 
  helpCircleOutline, informationCircleOutline, heartOutline, receiptOutline, chevronDown, chevronUp
, settingsOutline, bagOutline,homeOutline } from 'ionicons/icons';
import { h } from 'ionicons/dist/types/stencil-public-runtime';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  user = {
    user_id: 0,
    first_name: '',
    last_name: '',
    email: '',
    profile_image: 'assets/images/default-profile.png'
  };

  constructor(
    private menu: MenuController,
    private router: Router,
    private http: HttpClient,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    // Add icons
    addIcons({ cart, menu, heart, star, cartOutline, searchOutline, search, logOutOutline, personOutline,
      listOutline, helpCircleOutline, informationCircleOutline, heartOutline, receiptOutline, chevronDown, chevronUp
    , settingsOutline, bagOutline,homeOutline });

    // Load user info
    if (this.router.url === '/' || this.router.url === '/register' || this.router.url === '/login') {
      const userId = localStorage.getItem('user_id');

      if (userId) {
        this.loadUserData(userId);
        this.router.navigate(['/home']); // navigate automatically if logged in
      } else {
        this.router.navigate(['/register']); // or let redirect handle it
      }
    }

  }

  loadUserData(userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get(`https://add2mart.shop/ionic/coffium/api/get_user.php?user_id=${userId}`)
        .subscribe(
          (res: any) => {
            if (res.success && res.user) {
              this.user = {
                user_id: res.user.user_id || res.user.id || 0,
                first_name: res.user.first_name || '',
                last_name: res.user.last_name || '',
                email: res.user.email || '',
                profile_image: res.user.profile_image
                  ? `https://add2mart.shop/ionic/coffium/api/images/profile_picture/${res.user.profile_image}`
                  : 'assets/images/default-profile.png'
              };
            } else {
              console.warn('User data not found:', res.message);
            }
            resolve(); // always resolve so navigation continues
          },
          err => {
            console.error('Error fetching user data:', err);
            this.showToast('Failed to load user data', 'danger');
            resolve(); // resolve anyway so navigation continues
          }
        );
    });
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({ message, duration: 1500, color });
    await toast.present();
  }

  logout() {
    // Clear session
    localStorage.removeItem('user_id');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');

    // Close menu first
    this.menu.close('first').then(() => {
      this.router.navigate(['/login']);
    }).catch(() => {
      // fallback
      this.router.navigate(['/login']);
    });
  }

}
