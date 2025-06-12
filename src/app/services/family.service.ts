import { Inject, Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RoutesService } from './routes.service';
import { Family } from '../models/Family';
import { FamilyMemberStatus } from '../models/FamilyMemberStatus';
import { FamilyMember } from '../models/FamilyMember';
import { HouseholdType } from '../models/HouseholdType';
import { Task } from '../models/Task';
import { Metric } from '../models/Metric';
import { Reward } from '../models/Reward';
import { TaskList } from '../models/TaskList';
import { UserService } from './user.service';
import { MessageService } from 'primeng/api';
import { RecurrenceType } from '../models/Recurrence';
import { AssignedTask } from '../models/AssignedTask';

@Injectable({
  providedIn: 'root',
})
export class FamilyService {

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private communicationService: CommunicationService,
    private rs: RoutesService,
  ) { }

  showNoFamilyErrorMessage() {
    this.messageService.add({
      severity: 'error',
      summary: 'Oops',
      detail: "Something went wrong with the authentication: your family wasn't retrieved properly. \nPlease try again."
    });
    return Error('No family retrieved');
  }

  showNoUserErrorMessage() {
    this.messageService.add({
      severity: 'error',
      summary: 'Oops',
      detail: "Something went wrong with the authentication: your user wasn't retrieved properly. \nPlease try again."
    });
    return Error('No user retrieved');
  }

  updateFamily(): Promise<Family> {
    if (this.userService.family)
      return this.communicationService.call(this.rs.updateFamily, this.userService.family, { id: this.userService.family.id });
    else
      throw this.showNoFamilyErrorMessage();
  }

  updateFamilyMember(member: FamilyMember): Promise<Family> {
    if (this.userService.family)
      return this.communicationService.call(this.rs.updateFamilyMember, member, { id: member.id });
    else
      throw this.showNoFamilyErrorMessage();
  }

  deleteFamilyMember(member: FamilyMember): Promise<Family> {
    if (this.userService.family)
      return this.communicationService.call(this.rs.deleteFamilyMember, {}, { id: member.id });
    else
      throw this.showNoFamilyErrorMessage();
  }

  getStatuses(): Promise<FamilyMemberStatus[]> {
    return this.communicationService.call(this.rs.getFamilyMemberStatuses);
  }

  getFamilyMember(member: FamilyMember): Promise<FamilyMember> {
    return this.communicationService.call(this.rs.getFamilyMember, {}, { id: member.id });
  }

  createMember(member: FamilyMember): Promise<FamilyMember> {
    if (this.userService.family) {
      return this.communicationService.call(this.rs.createFamilyMember, member, { id: this.userService.family.id });
    } else {
      throw this.showNoFamilyErrorMessage();
    }
  }

  async getFamilyMembers(): Promise<FamilyMember[]> {
    if (this.userService.family)
      return (await this.communicationService.call<FamilyMember[]>(this.rs.getFamilyMembers, {}, { id: this.userService.family.id })).map((fm) => new FamilyMember(fm));
    else
      throw this.showNoFamilyErrorMessage();
  }

  getHouseholdTypes(): Promise<HouseholdType[]> {
    return this.communicationService.call(this.rs.getHouseholdTypes);
  }

  async pickHousehold(): Promise<void> {
    if (this.userService.family) {
      await this.communicationService.call(this.rs.pickHousehold, this.userService.family, { id: this.userService.family.id });
      await this.userService.refreshFamily();
    }
    else
      throw this.showNoFamilyErrorMessage();
  }

  getFamilyTasks(): Promise<Task[]> {
    if (this.userService.family)
      return this.communicationService.call(this.rs.getFamilyTasks, {}, { family_id: this.userService.family.id });
    else
      throw this.showNoFamilyErrorMessage();

  }

  createFamilyTask(task: Task): Promise<Task> {
    if (this.userService.family)
      return this.communicationService.call(this.rs.createFamilyTask, task, { family_id: this.userService.family.id });
    else
      throw this.showNoFamilyErrorMessage();
  }

  updateFamilyTask(task: Task): Promise<Task> {
    if (this.userService.family)
      return this.communicationService.call(this.rs.updateFamilyTask, task, { family_id: this.userService.family.id, task_id: task.id });
    else
      throw this.showNoFamilyErrorMessage();
  }

  deleteFamilyTask(task: Task): Promise<Task> {
    if (this.userService.family)
      return this.communicationService.call(this.rs.deleteFamilyTask, {}, { family_id: this.userService.family.id, task_id: task.id });
    else
      throw this.showNoFamilyErrorMessage();
  }

  getFamilyMetrics(): Promise<Metric[]> {
    if (this.userService.family)
      return this.communicationService.call(this.rs.getFamilyMetrics, {}, { family_id: this.userService.family.id });
    else
      throw this.showNoFamilyErrorMessage();
  }

  createFamilyMetric(metric: Metric): Promise<Metric> {
    if (this.userService.family)
      return this.communicationService.call(this.rs.createFamilyMetric, metric, { family_id: this.userService.family.id });
    else
      throw this.showNoFamilyErrorMessage();
  }

  updateFamilyMetric(metric: Metric): Promise<Metric> {
    if (this.userService.family)
      return this.communicationService.call(this.rs.updateFamilyMetric, metric, { family_id: this.userService.family.id, task_id: metric.id });
    else
      throw this.showNoFamilyErrorMessage();
  }

  deleteFamilyMetric(metric: Metric): Promise<Metric> {
    if (this.userService.family)
      return this.communicationService.call(this.rs.deleteFamilyMetric, {}, { family_id: this.userService.family.id, task_id: metric.id });
    else
      throw this.showNoFamilyErrorMessage();
  }

  getFamilyRewards(): Promise<Reward[]> {
    if (this.userService.family)
      return this.communicationService.call(this.rs.getFamilyRewards, {}, { family_id: this.userService.family.id });
    else
      throw this.showNoFamilyErrorMessage();
  }

  createFamilyReward(reward: Reward): Promise<Reward> {
    if (this.userService.family)
      return this.communicationService.call(this.rs.createFamilyReward, reward, { family_id: this.userService.family.id });
    else
      throw this.showNoFamilyErrorMessage();
  }

  updateFamilyReward(reward: Reward): Promise<Reward> {
    if (this.userService.family)
      return this.communicationService.call(this.rs.updateFamilyReward, reward, { family_id: this.userService.family.id, reward_id: reward.id });
    else
      throw this.showNoFamilyErrorMessage();
  }

  deleteFamilyReward(reward: Reward): Promise<Reward> {
    if (this.userService.family)
      return this.communicationService.call(this.rs.deleteFamilyReward, {}, { family_id: this.userService.family.id, reward_id: reward.id });
    else
      throw this.showNoFamilyErrorMessage();
  }

  assignTask(taskList: TaskList, member: FamilyMember): Promise<TaskList> {
    return this.communicationService.call(this.rs.assignTask, taskList, { member_id: member.id });
  }

  editAssignedTask(taskList: TaskList, member: FamilyMember): Promise<TaskList> {
    return this.communicationService.call(this.rs.editAssignedTask, taskList, { member_id: member.id });
  }

  async completeTask(assignedTask: AssignedTask): Promise<AssignedTask> {
    if (this.userService.member)
      return AssignedTask.assignedTaskDtoToAssignedTask(await this.communicationService.call(this.rs.completeTask, assignedTask, { member_id: this.userService.member.id }));
    else
      throw this.showNoUserErrorMessage();
  }

  async buyReward(reward: Reward): Promise<void> {
    if (this.userService.member) {
      await this.communicationService.call(this.rs.buyReward, {}, { member_id: this.userService.member.id, reward_id: reward.id });
      await this.userService.refreshMember();
    } else

      throw this.showNoUserErrorMessage();
  }

  async getFamilyTaskLists(): Promise<TaskList[]> {
    if (this.userService.family)
      return (await this.communicationService.call<TaskList[]>(this.rs.getAssignedTasks, {}, { family_id: this.userService.family.id })).map((t) => new TaskList(t));
    else
      throw this.showNoFamilyErrorMessage();
  }

  async getRecurrenceTypes(): Promise<RecurrenceType[]> {
    return (await this.communicationService.call<RecurrenceType[]>(this.rs.getRecurrenceTypes)).map((r) => new RecurrenceType(r));
  }
}
