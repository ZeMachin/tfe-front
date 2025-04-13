import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { AuthService } from './services/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NavBarComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'tfe';
  headerSettings = { showNavBar: true };

  constructor(
    private authService: AuthService
  ) {}

  isLoggedIn(): boolean { return this.authService.isAuthenticatedUser() }
}
