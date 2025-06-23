import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RoutesService } from './routes.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { addSeconds, differenceInSeconds, isBefore } from 'date-fns';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor(
    private communicationService: CommunicationService,
    private rs: RoutesService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) { }

  register(registerForm: {
    displayName: string,
    email: string,
    password: string
  }) {
    return this.communicationService.call<any>(this.rs.register, registerForm);
  }

  async login(email: string, password: string): Promise<boolean> {
    const basicAuth = btoa(`${email}:${password}`);
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Basic ${basicAuth}`
    });
    try {
      const login = await this.communicationService.call<LoginResponse>(this.rs.login, {}, {}, {}, headers);

      if (login.success && login.token) {
        await this.setSession(login);
        return true;
      } else {
        return false;
      }
    } catch (err: any) {
      console.error(err);
      const detail = err.error?.message
        ? `The following error occured: ${err.error?.message}`
        : 'Something went wrong during the login process. Please try again later.';
      this.messageService.add({
        severity: 'error',
        summary: 'Failure',
        detail,
      });
      return false;
    }
  }

  checkPin(memberId: number, pin: string): Promise<boolean> {
    return this.communicationService.call<boolean>(this.rs.confirmPin, { member_id: memberId, pin });
  }

  private async setSession(authResult: LoginResponse) {
    const expiresAt: Date = addSeconds(new Date(), authResult.expiresIn);
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    const id = this.jwtHelperService.decodeToken(authResult.token).sub;
    await this.userService.loadFamily(id);
  }

  get tokenExpirationDate(): Date {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = expiration ? JSON.parse(expiration) : new Date();
    return new Date(expiresAt);
  }

  get secondsLeftBeforeTokenExpiration(): number {
    return differenceInSeconds(this.tokenExpirationDate, new Date());
  }

  get isAuthenticated(): boolean {
    return isBefore(new Date(), this.tokenExpirationDate);
  }

  get isAdult(): boolean {
    return this.userService.member?.status.name === 'Adult';
  }

  logout(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('family');
    localStorage.removeItem('member');
    localStorage.removeItem('expires_at');
    this.userService.family = undefined;
    this.userService.member = undefined;
    this.router.navigateByUrl('login');
  }
}

interface LoginResponse {
  success: boolean,
  message: string,
  token: string,
  expiresIn: number
}