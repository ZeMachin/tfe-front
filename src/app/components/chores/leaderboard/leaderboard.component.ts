import { Component } from '@angular/core';
import { FamilyMember } from '../../../models/FamilyMember';
import { FamilyService } from '../../../services/family.service';
import { UserService } from '../../../services/user.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-leaderboard',
  imports: [TableModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.less'
})
export class LeaderboardComponent {
  members: FamilyMember[] = [];

  constructor(
    private familyService: FamilyService,
    private userService: UserService
  ) { }

  async ngOnInit(): Promise<void> {
    this.loadMembers();
  }

  async loadMembers() {
    if (this.userService.family)
      this.members = await this.familyService.getFamilyMembers(this.userService.family.id);
  }

  getMemberPoints(member: FamilyMember): number {
    return member.taskLists ? member.taskLists.map((tl) => tl.points ?? 0).reduce((a, b) => a + b) : 0;
  }
}
