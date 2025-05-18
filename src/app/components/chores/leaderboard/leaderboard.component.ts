import { Component } from '@angular/core';
import { FamilyMember } from '../../../models/FamilyMember';
import { FamilyService } from '../../../services/family.service';
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
  ) { }

  async ngOnInit(): Promise<void> {
    this.loadMembers();
  }

  async loadMembers() {
    this.members = await this.familyService.getFamilyMembers();
  }

  getMemberPoints(member: FamilyMember): number {
    return member.taskLists ? member.taskLists.filter((tl) => tl.completedAt).map((tl) => tl.points ?? 0).reduce((a, b) => a + b, 0) : 0;
  }
}
