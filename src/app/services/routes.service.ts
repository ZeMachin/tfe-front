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
}

export interface Connection {
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
}