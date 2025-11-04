import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './verify-otp.page.html',
  styleUrls: ['./verify-otp.page.scss'],
})
export class VerifyOtpPage {
  email: string = '';
  otp: string = '';
  apiUrl = 'https://add2mart.shop/ionic/coffium/api/verify_otp.php';

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  verifyOtp() {
    if (!this.email || !this.otp) {
      this.showToast('Please enter the OTP code.', 'danger');
      return;
    }

    this.http.post(this.apiUrl, { email: this.email, otp: this.otp }).subscribe({
      next: (res: any) => {
        if (res.success) {
          localStorage.setItem('user_id', res.user_id);
          localStorage.setItem('user_email', res.email);
          this.router.navigate(['/home']); // redirect to homepage
        } else {
          this.showToast(res.message || 'Invalid OTP.', 'danger');
        }
      },
      error: (err) => {
        console.error('Error verifying OTP:', err);
        this.showToast('Connection error. Please try again.', 'danger');
      }
    });
  }

  resendOtp() {
    // Optional: you can create resend_otp.php for this endpoint
    this.showToast('Resend OTP feature coming soon!', 'medium');
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }
}
