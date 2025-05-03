import { Injectable } from '@angular/core';
import { Family } from '../models/Family';
import { FamilyMember } from '../models/FamilyMember';
import { FamilyService } from './family.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  family?: Family;
  member?: FamilyMember;

  constructor(
    private familyService: FamilyService
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

  async updateMember() {
    if (this.member) localStorage.setItem('member', JSON.stringify(await this.familyService.updateFamilyMember(this.member)));
  }

  async refreshMember() {
    if (this.member) await this.loadMember(this.member.id);
  }
}

export interface Settings {
  leaderboard: boolean,
  rewards: boolean
}