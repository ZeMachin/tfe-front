import { Injectable, OnInit } from '@angular/core';
import { Family } from '../models/Family';
import { FamilyMember } from '../models/FamilyMember';
import { TaskList, TaskListDTO } from '../models/TaskList';
import { CommunicationService } from './communication.service';
import { RoutesService } from './routes.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  family?: Family;
  member?: FamilyMember;

  constructor(
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
      localStorage.setItem('family', JSON.stringify(await this.updateFamily()));
      await this.refreshFamily();
    }
  }

  async refreshFamily() {
    if (this.family) await this.loadFamily(this.family.id);
  }

  async loadMember(id: string | number): Promise<void> {
    this.member = await this.getFamilyMember(id);
    localStorage.setItem('member', JSON.stringify(this.member));
  }

  selectUser(member: FamilyMember) {
    this.member = member;
    localStorage.setItem('member', JSON.stringify(this.member));
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

  async getAssignedTasks(): Promise<TaskList[]> {
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