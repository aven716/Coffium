import { Component } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from '../../shared/app-header/app-header.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [IonicModule, CommonModule, AppHeaderComponent],
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage {
  constructor(private menu: MenuController) { }

  onHeaderToggleMenu() {
    this.menu.enable(true, 'first');
    this.menu.toggle('first');
  }
}
