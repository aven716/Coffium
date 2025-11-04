import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController, MenuController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { AppHeaderComponent } from '../../shared/app-header/app-header.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppHeaderComponent
  ],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    contact_no: string;
    address: string;
    profile_image: string;
  } = {
      user_id: 0,
      first_name: '',
      last_name: '',
      email: '',
      contact_no: '',
      address: '',
      profile_image: 'assets/images/default-profile.png',
    };

  loading = true;
  userImageBaseUrl = 'https://add2mart.shop/ionic/coffium/api/images/profile_picture/';

  constructor(
    private menu: MenuController,
    private toastCtrl: ToastController,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.waitForUserId();
  }

  onHeaderToggleMenu() {
    this.menu.enable(true, 'first');
    this.menu.toggle('first');
  }

  // wait for user id stored in localStorage
  waitForUserId(retries: number = 5) {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.user.user_id = +userId;
      this.loadUserData(userId);
    } else if (retries > 0) {
      console.warn('User ID missing — retrying...');
      setTimeout(() => this.waitForUserId(retries - 1), 500);
    } else {
      console.error('User ID not found after retries.');
      this.loading = false;
    }
  }

  loadUserData(userId: string) {
    this.http
      .get(`https://add2mart.shop/ionic/coffium/api/get_user.php?user_id=${userId}`)
      .subscribe(
        (res: any) => {
          if (res.success && res.user) {
            const u = res.user;
            this.user = {
              user_id: +u.user_id || +u.id || 0,
              first_name: u.first_name || '',
              last_name: u.last_name || '',
              email: u.email || '',
              contact_no: u.contact_no || 'N/A',
              address: u.address || 'N/A',
              profile_image: u.profile_image
                ? this.userImageBaseUrl + u.profile_image
                : 'assets/images/default-profile.png',
            };
          } else {
            console.warn('User not found or API error:', res.message);
            this.showToast('Failed to load profile', 'danger');
          }
          this.loading = false;
        },
        (err) => {
          console.error('Error loading user:', err);
          this.showToast('Server error loading profile', 'danger');
          this.loading = false;
        }
      );
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      color,
    });
    await toast.present();
  }

  logout() {
    localStorage.removeItem('user_id');
    this.showToast('Logged out successfully', 'medium');
    this.router.navigate(['/login']);
  }
}
