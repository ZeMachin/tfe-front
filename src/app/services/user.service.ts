import { Injectable } from '@angular/core';
import { Family } from '../models/Family';
import { FamilyMember } from '../models/FamilyMember';
import { FamilyService } from './family.service';
import { TaskList, TaskListDTO } from '../models/TaskList';
import { CommunicationService } from './communication.service';
import { RoutesService } from './routes.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  family?: Family;
  member?: FamilyMember;

  constructor(
    private familyService: FamilyService,
    private communicationService: CommunicationService,
    private rs: RoutesService
  ) {
    const familyStorage = localStorage.getItem('family');
    if (familyStorage) {
      this.family = JSON.parse(familyStorage);
      this.refreshFamily();
    }
    const memberStorage = localStorage.getItem('member');
    if (memberStorage) {
      this.member = JSON.parse(memberStorage);
      this.refreshMember();
    }
  }

  async loadFamily(id: string | number): Promise<void> {
    this.family = await this.familyService.getFamily(id);
    // if(!this.family) this.authService.logout(); // TODO: fix circular dependency
    // else 
    localStorage.setItem('family', JSON.stringify(this.family));
  }

  async updateFamily() {
    if (this.family) localStorage.setItem('family', JSON.stringify(await this.familyService.updateFamily(this.family)));
  }

  async refreshFamily() {
    if (this.family) await this.loadFamily(this.family.id);
  }

  async loadMember(id: string | number): Promise<void> {
    this.member = await this.familyService.getFamilyMember(id);
    localStorage.setItem('member', JSON.stringify(this.member));
  }

  selectUser(member: FamilyMember) {
    this.member = member;
    localStorage.setItem('member', JSON.stringify(this.member));
  } 

  async updateMember() {
    if (this.member) localStorage.setItem('member', JSON.stringify(await this.familyService.updateFamilyMember(this.member)));
  }

  async refreshMember() {
    if (this.member) await this.loadMember(this.member.id);
  }

  async getAssignedTasks(): Promise<TaskList[]> {
    if(this.member)
      return (await this.communicationService.call<TaskListDTO[]>(this.rs.getUserTasks, {}, { member_id: this.member.id })).map((t) => TaskList.taskListDtoToTaskList(t));
    else 
      throw Error('No user logged on.');
  }
}

export interface Settings {
  leaderboard: boolean,
  rewards: boolean
}