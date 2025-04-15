import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RoutesService } from './routes.service';
import { Family } from '../models/Family';
import { FamilyMemberStatus } from '../models/FamilyMemberStatus';
import { FamilyMember } from '../models/FamilyMember';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  constructor(
      private communicationService: CommunicationService,
      private rs: RoutesService,
    ) { }

  getFamily(id: string | number): Promise<Family> {
    return this.communicationService.call(this.rs.getFamily, {}, { id });
  }

  updateFamily(family: Family): Promise<Family> {
    return this.communicationService.call(this.rs.updateFamily, family, { id: family.id });
  }

  getStatuses(): Promise<FamilyMemberStatus[]> {
    return this.communicationService.call(this.rs.getFamilyMemberStatuses);
  }

  createMember(family: Family, member: FamilyMember): Promise<FamilyMember> {
    return this.communicationService.call(this.rs.createFamilyMember, member, { id: family.id });
  }

  createMemberAndMoveToNextStep(family: Family, member: FamilyMember): Promise<FamilyMember> {
    return this.communicationService.call(this.rs.createMemberAndMoveToNextStep, member, { id: family.id });
  }

  getFamilyMember(id: string | number): Promise<FamilyMember> {
    return this.communicationService.call(this.rs.getFamilyMember, {}, { id });
  }

  updateFamilyMember(member: FamilyMember): Promise<FamilyMember> {
    return this.communicationService.call(this.rs.updateFamilyMember, member, { id: member.id });
  }
}
