import { Injectable } from '@angular/core';
import { Family } from '../models/Family';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  family?: Family;
}

export interface Settings {
  leaderboard: boolean,
  rewards: boolean
}