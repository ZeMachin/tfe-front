import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RoutesService } from './routes.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private authSecretKey = 'Bearer Token';

  constructor(
    private communicationService: CommunicationService,
    private rs: RoutesService
  ) {
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }

  register(registerForm: {
    displayName: string,
    email: string,
    password: string
  }) {
    return this.communicationService.call<any>(this.rs.register, registerForm);
  }
  
  async login(email: string, password: string): Promise<boolean> {
    const login = await this.communicationService.call<{ success: boolean, message: string, token: string | undefined }>(this.rs.login, { email, password });
    if (login.success && login.token) {
      const authToken = login.token;
      localStorage.setItem(this.authSecretKey, authToken);
      this.isAuthenticated = true;
      return true;
    } else {
      return false;
    }
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;
  }
}