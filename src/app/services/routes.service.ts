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

  getFamilyMember: Connection = {
    url: `${this.baseUrl}/families/member/:id`,
    method: 'GET'
  };

  updateFamilyMember: Connection = {
    url: `${this.baseUrl}/families/member/:id`,
    method: 'PUT'
  };
}

export interface Connection {
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
}