import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FamilyMember } from '../../../models/FamilyMember';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.less'
})
export class UserProfileComponent implements OnInit {
  member?: FamilyMember;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const extras = this.router.getCurrentNavigation()?.extras;
    console.log('extras:', extras);
    const data = this.route.snapshot. 
  }

}
