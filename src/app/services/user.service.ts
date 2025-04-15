import { Injectable } from '@angular/core';
import { Family } from '../models/Family';
import { FamilyMember } from '../models/FamilyMember';
import { FamilyService } from './family.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private familyService: FamilyService
  ) { }

  async loadFamily(id: string | number): Promise<void> {
    this.family = await this.familyService.getFamily(id);
  }

  family?: Family;
  member?: FamilyMember;
}

export interface Settings {
  leaderboard: boolean,
  rewards: boolean
}