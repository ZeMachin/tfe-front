import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RoutesService } from './routes.service';
import { Family } from '../models/Family';
import { FamilyMemberStatus } from '../models/FamilyMemberStatus';
import { FamilyMember } from '../models/FamilyMember';
import { HouseholdType } from '../models/HouseholdType';
import { Task } from '../models/Task';
import { Metric } from '../models/Metric';

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

  getHouseholdTypes(): Promise<HouseholdType[]> {
    return this.communicationService.call(this.rs.getHouseholdTypes);
  }

  pickHousehold(family: Family): Promise<Family> {
    return this.communicationService.call(this.rs.pickHousehold, family, { id: family.id });
  }

  getFamilyTasks(family: Family): Promise<Task[]> {
    return this.communicationService.call(this.rs.getFamilyTasks, {}, { family_id: family.id });
  }

  createFamilyTask(family: Family, task: Task): Promise<Task> {
    return this.communicationService.call(this.rs.createFamilyTask, task, { family_id: family.id });
  }

  updateFamilyTask(family: Family, task: Task): Promise<Task> {
    return this.communicationService.call(this.rs.updateFamilyTask, task, { family_id: family.id, task_id: task.id });
  }

  deleteFamilyTask(family: Family, task: Task): Promise<Task> {
    return this.communicationService.call(this.rs.deleteFamilyTask, {}, { family_id: family.id, task_id: task.id });
  }

  getFamilyMetrics(family: Family): Promise<Metric[]> {
    return this.communicationService.call(this.rs.getFamilyMetrics, {}, { family_id: family.id });
  }

  createFamilyMetric(family: Family, metric: Metric): Promise<Metric> {
    return this.communicationService.call(this.rs.createFamilyMetric, metric, { family_id: family.id });
  }

  updateFamilyMetric(family: Family, metric: Metric): Promise<Metric> {
    return this.communicationService.call(this.rs.updateFamilyMetric, metric, { family_id: family.id, task_id: metric.id });
  }

  deleteFamilyMetric(family: Family, metric: Metric): Promise<Metric> {
    return this.communicationService.call(this.rs.deleteFamilyMetric, {}, { family_id: family.id, task_id: metric.id });
  }
}
