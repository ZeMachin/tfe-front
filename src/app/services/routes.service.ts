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
    url: `${this.baseUrl}/auth/register`,
    method: 'POST'
  };

  login: Connection = {
    url: `${this.baseUrl}/auth/login`,
    method: 'POST'
  };

  confirmPin: Connection = {
    url: `${this.baseUrl}/auth/confirm_pin`,
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

  deleteFamilyMember: Connection = {
    url: `${this.baseUrl}/families/member/:id`,
    method: 'DELETE'
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
    url: `${this.baseUrl}/metrics/family/:family_id/metric/:metric_id`,
    method: 'PUT'
  };

  deleteFamilyMetric: Connection = {
    url: `${this.baseUrl}/metrics/family/:family_id/metric/:metric_id`,
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

  updateAssignedTask: Connection = {
    url:  `${this.baseUrl}/tasks/member/:member_id/assigned_task/:id`,
    method: 'PUT'
  }

  updateTaskList: Connection = {
    url:  `${this.baseUrl}/tasks/member/:member_id/tasklist/:id`,
    method: 'PUT'
  }

  deleteAssignedTask: Connection = {
    url:  `${this.baseUrl}/tasks/member/:member_id/assigned_task/:id`,
    method: 'DELETE'
  }

  deleteTaskList: Connection = {
    url:  `${this.baseUrl}/tasks/member/:member_id/tasklist/:id`,
    method: 'DELETE'
  }

  completeTask: Connection = {
    url:  `${this.baseUrl}/tasks/member/:member_id/complete_task`,
    method: 'PUT'
  }

  buyReward: Connection = {
    url:  `${this.baseUrl}/rewards/member/:member_id/reward/:reward_id/buy_reward`,
    method: 'PUT'
  }

  getAssignedTasks: Connection = {
    url:  `${this.baseUrl}/tasks/family/:family_id/assigned_tasks`,
    method: 'GET'
  }

  getRecurrenceTypes: Connection = {
    url:  `${this.baseUrl}/tasks/recurrence_types`,
    method: 'GET'
  }
}

export interface Connection {
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
}