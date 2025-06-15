import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { AuthService } from './services/auth.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NavBarComponent, ToastModule, ConfirmDialogModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'tfe';

  constructor(
    private authService: AuthService
  ) {}

  isLoggedIn(): boolean { return this.authService.isAuthenticatedUser }
}
