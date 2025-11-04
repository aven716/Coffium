import { Component } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from '../../shared/app-header/app-header.component'; // adjust path here

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [IonicModule, CommonModule, AppHeaderComponent],
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
  
})
export class FaqsPage {
  constructor(private menu: MenuController) { }

  onHeaderToggleMenu() {
    this.menu.enable(true, 'first');
    this.menu.toggle('first');
  }

  faqs = [
    {
      question: 'How do I place an order?',
      answer:
        'Simply browse products, select your desired size and quantity, then tap “Add to Cart”. Once done, proceed to checkout from your cart page.',
      expanded: false
    },
    {
      question: 'Can I cancel or change my order?',
      answer:
        'Yes, as long as your order is still under "To Pay" or "To Ship" status. Go to Orders > Manage Order > Cancel or Edit.',
      expanded: false
    },
    {
      question: 'How long is delivery?',
      answer:
        'Delivery typically takes 3–5 business days depending on your location.',
      expanded: false
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        'We accept Cash on Delivery (COD), PayPal, and PayMongo for debit/credit card payments.',
      expanded: false
    },
    
  ];

  toggleExpand(item: any) {
    item.expanded = !item.expanded;
  }
}
