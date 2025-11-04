import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, MenuController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  @Input() showSearchbar: boolean = true;
  @Input() showIcons: boolean = true;
  @Output() toggleMenu = new EventEmitter<void>();

  user = {
    user_id: 0,
    first_name: '',
    last_name: '',
    email: '',
    profile_image: '',
    address: ''
  };

  searchQuery: string = '';
  searchResults: any[] = [];
  searching: boolean = false;

  constructor(
    private http: HttpClient,
    private menu: MenuController,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.loadUserData(userId);
    }
  }

  toggleSidebar() {
    console.log('Header click - emitting toggleMenu');
    this.toggleMenu.emit();
  }

  loadUserData(userId: string) {
    this.http.get(`https://add2mart.shop/ionic/coffium/api/get_user.php?user_id=${userId}`)
      .subscribe((res: any) => {
        if (res.success && res.user) {
          this.user = {
            user_id: res.user.id || 0,
            first_name: res.user.first_name || '',
            last_name: res.user.last_name || '',
            email: res.user.email || '',
            address: res.user.address || '',
            profile_image: res.user.profile_image
              ? `https://add2mart.shop/ionic/coffium/api/images/profile_picture/${res.user.profile_image}`
              : 'assets/images/default-profile.png'
          };
        }
      }, err => console.error('User fetch error:', err));
  }


  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({ message, duration: 1500, color });
    await toast.present();
  }

  /** 🔍 Search for products matching the query */
  onSearchChange(event: any) {
    const query = event.detail.value.trim();
    this.searchQuery = query;

    if (query.length < 2) {
      this.searchResults = [];
      return;
    }

    this.searching = true;
    this.http
      .get(`https://add2mart.shop/ionic/coffium/api/search_products.php?query=${encodeURIComponent(query)}`)
      .subscribe(
        (res: any) => {
          this.searching = false;
          if (res.success && res.products) {
            this.searchResults = res.products;
          } else {
            this.searchResults = [];
            this.showToast('No products found', 'medium');
          }
        },
        err => {
          console.error('Search error:', err);
          this.searching = false;
          this.showToast('Search failed', 'danger');
        }
      );
  }

  /** 📦 Navigate to the product page */
  openProduct(product: any) {
    this.router.navigate(['/product', product.product_id]);
  }

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }


  toggleSearch() {
    this.searchExpanded = !this.searchExpanded;
  }
  searchExpanded = false;




}
