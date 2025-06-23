import { Inject, Injectable, LOCALE_ID, OnInit } from '@angular/core';
import { Family } from '../models/Family';
import { FamilyMember } from '../models/FamilyMember';
import { TaskList, TaskListDTO } from '../models/TaskList';
import { CommunicationService } from './communication.service';
import { RoutesService } from './routes.service';
import { MessageService } from 'primeng/api';

import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  family?: Family;
  member?: FamilyMember;

  private jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private communicationService: CommunicationService,
    private rs: RoutesService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {

    console.log('token expiry date:', this.authService.tokenExpirationDate)
    if (this.authService.isTokenExpired) {
      console.log('token expired')
      this.logout();
    } else {
      const familyStorage = localStorage.getItem('family');
      if (familyStorage && familyStorage !== 'undefined') {
        this.family = JSON.parse(familyStorage);
      }
      this.refreshFamily();

      const memberStorage = localStorage.getItem('member');
      if (memberStorage) {
        this.member = JSON.parse(memberStorage);
      }
      this.refreshMember();
    }
  }

  async loadFamily(id: string | number): Promise<void> {
    this.family = await this.getFamily(id);
    if (!this.family) this.authService.logout();
    else localStorage.setItem('family', JSON.stringify(this.family));
  }

  async updateFamily() {
    if (this.family) {
      try {
        localStorage.setItem('family', JSON.stringify(await this.communicationService.call(this.rs.updateFamily, this.family, { id: this.family.id })));
        await this.refreshFamily();
        this.messageService.add({
          severity: 'success',
          summary: 'Assigned',
          detail: 'The household data has been updated successfully.',
        });
      } catch (err) {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: 'Something went wrong, the household has not been updated. Please try again.'
        });
      }
    }
  }

  async refreshFamily() {
    if (this.family) {
      await this.loadFamily(this.family.id);
    } else {
      const token = localStorage.getItem('id_token');
      if (token) {
        const id = this.jwtHelperService.decodeToken(token).sub;
        await this.loadFamily(id);
      }
    }
  }

  async loadMember(id: string | number): Promise<void> {
    this.member = await this.getFamilyMember(id);
    localStorage.setItem('member', JSON.stringify(this.member));
  }

  async selectUser(member: FamilyMember) {
    this.member = member;
    localStorage.setItem('member', JSON.stringify(this.member));
    await this.refreshMember();
  }

  async updateMember() {
    if (this.member) {
      localStorage.setItem('member', JSON.stringify(await this.updateFamilyMember(this.member)));
      await this.refreshMember();
    }
  }

  async refreshMember() {
    if (this.member) await this.loadMember(this.member.id);
  }

  async getTaskLists(): Promise<TaskList[]> {
    if (this.member)
      return (await this.communicationService.call<TaskListDTO[]>(this.rs.getUserTasks, {}, { member_id: this.member.id })).map((t) => TaskList.taskListDtoToTaskList(t));
    else
      throw Error('No user logged on.');
  }

  getFamily(id: string | number): Promise<Family | undefined> {
    return this.communicationService.call(this.rs.getFamily, {}, { id });
  }

  getFamilyMember(id: string | number): Promise<FamilyMember> {
    return this.communicationService.call(this.rs.getFamilyMember, {}, { id });
  }

  updateFamilyMember(member: FamilyMember): Promise<FamilyMember> {
    return this.communicationService.call(this.rs.updateFamilyMember, member, { id: member.id });
  }

  logout() {
    this.family = undefined;
    this.member = undefined;
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

  get isAdult(): boolean {
    return this.member?.status.name === 'Adult';
  }
}

export interface Settings {
  leaderboard: boolean,
  rewards: boolean
}