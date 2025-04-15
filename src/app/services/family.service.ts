import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RoutesService } from './routes.service';
import { Family } from '../models/Family';

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
}
