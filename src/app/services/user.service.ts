import { Inject, Injectable, LOCALE_ID, OnInit } from '@angular/core';
import { Family } from '../models/Family';
import { FamilyMember } from '../models/FamilyMember';
import { TaskList, TaskListDTO } from '../models/TaskList';
import { CommunicationService } from './communication.service';
import { RoutesService } from './routes.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  family?: Family;
  member?: FamilyMember;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private communicationService: CommunicationService,
    private rs: RoutesService,
    private messageService: MessageService
  ) {
    const familyStorage = localStorage.getItem('family');
    if (familyStorage && familyStorage !== 'undefined') {
      this.family = JSON.parse(familyStorage);
      this.refreshFamily();
    }
    const memberStorage = localStorage.getItem('member');
    if (memberStorage) {
      this.member = JSON.parse(memberStorage);
      this.refreshMember();
    }
  }

  async ngOnInit(): Promise<void> {
    await this.refreshFamily();
    await this.refreshMember();
  }

  async loadFamily(id: string | number): Promise<void> {
    this.family = await this.getFamily(id);
    // if(!this.family) this.authService.logout(); // TODO: fix circular dependency
    // else 
    localStorage.setItem('family', JSON.stringify(this.family));
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
    if (this.family) await this.loadFamily(this.family.id);
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
}

export interface Settings {
  leaderboard: boolean,
  rewards: boolean
}