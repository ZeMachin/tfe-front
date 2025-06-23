import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RoutesService } from './routes.service';
import { HttpHeaders } from '@angular/common/http';
import { addSeconds, differenceInSeconds, isAfter, isBefore } from 'date-fns';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private communicationService: CommunicationService,
    private rs: RoutesService,
    private messageService: MessageService,
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


  get isTokenExpired(): boolean {
    return isAfter(new Date(), this.tokenExpirationDate);
  }

  logout(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('family');
    localStorage.removeItem('member');
    localStorage.removeItem('expires_at');
  }
}

interface LoginResponse {
  success: boolean,
  message: string,
  token: string,
  expiresIn: number
}