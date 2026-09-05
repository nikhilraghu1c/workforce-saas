import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicNavbarComponent } from '../../shared/navigation/public-navbar/public-navbar.component';

@Component({
  selector: 'app-public-layout',
  imports: [PublicNavbarComponent, RouterOutlet],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.scss',
})
export class PublicLayoutComponent {}
