import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutesService implements OnInit {
  private baseUrl = "/api";

  ngOnInit(): void {
    console.log('base url:', this.baseUrl)
  }

  register: Connection = {
    url: `${this.baseUrl}/families/register`,
    method: 'POST'
  };

  login: Connection = {
    url: `${this.baseUrl}/families/login`,
    method: 'POST'
  };

  getFamily: Connection = {
    url: `${this.baseUrl}/families/:id`,
    method: 'GET'
  };

  updateFamily: Connection = {
    url: `${this.baseUrl}/families/:id`,
    method: 'PUT'
  };

  getFamilyMemberStatuses: Connection = {
    url: `${this.baseUrl}/families/statuses`,
    method: 'GET'
  };

  createFamilyMember: Connection = {
    url: `${this.baseUrl}/families/:id/member`,
    method: 'POST'
  };
  
  createMemberAndMoveToNextStep: Connection = {
    url: `${this.baseUrl}/families/:id/member_and_next_step`,
    method: 'POST'
  };

  getFamilyMembers: Connection = {
    url: `${this.baseUrl}/families/:id/members`,
    method: 'GET'
  };

  getFamilyMember: Connection = {
    url: `${this.baseUrl}/families/member/:id`,
    method: 'GET'
  };

  updateFamilyMember: Connection = {
    url: `${this.baseUrl}/families/member/:id`,
    method: 'PUT'
  };

  getHouseholdTypes: Connection = {
    url: `${this.baseUrl}/families/household_types`,
    method: 'GET'
  };

  pickHousehold: Connection = {
    url: `${this.baseUrl}/families/pick_household/:id`,
    method: 'PUT'
  };

  getFamilyTasks: Connection = {
    url: `${this.baseUrl}/tasks/family/:family_id`,
    method: 'GET'
  };

  createFamilyTask: Connection = {
    url: `${this.baseUrl}/tasks/family/:family_id`,
    method: 'POST'
  };

  updateFamilyTask: Connection = {
    url: `${this.baseUrl}/tasks/family/:family_id/task/:task_id`,
    method: 'PUT'
  };

  deleteFamilyTask: Connection = {
    url: `${this.baseUrl}/tasks/family/:family_id/task/:task_id`,
    method: 'DELETE'
  };

  getFamilyMetrics: Connection = {
    url: `${this.baseUrl}/metrics/family/:family_id`,
    method: 'GET'
  };

  createFamilyMetric: Connection = {
    url: `${this.baseUrl}/metrics/family/:family_id`,
    method: 'POST'
  };

  updateFamilyMetric: Connection = {
    url: `${this.baseUrl}/metrics/family/:family_id/task/:task_id`,
    method: 'PUT'
  };

  deleteFamilyMetric: Connection = {
    url: `${this.baseUrl}/metrics/family/:family_id/task/:task_id`,
    method: 'DELETE'
  };

  getFamilyRewards: Connection = {
    url: `${this.baseUrl}/rewards/family/:family_id`,
    method: 'GET'
  };
  
  createFamilyReward: Connection = {
    url: `${this.baseUrl}/rewards/family/:family_id`,
    method: 'POST'
  };
  
  updateFamilyReward: Connection = {
    url: `${this.baseUrl}/rewards/family/:family_id/reward/:reward_id`,
    method: 'PUT'
  };
  
  deleteFamilyReward: Connection = {
    url: `${this.baseUrl}/rewards/family/:family_id/reward/:reward_id`,
    method: 'DELETE'
  };

  getUserTasks: Connection = {
    url: `${this.baseUrl}/tasks/member/:member_id`,
    method: 'GET'
  }

  assignTask: Connection = {
    url:  `${this.baseUrl}/tasks/member/:member_id/assign_task`,
    method: 'POST'
  }
}

export interface Connection {
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
}