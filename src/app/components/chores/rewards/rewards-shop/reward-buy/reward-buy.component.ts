import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reward } from '../../../../../models/Reward';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-reward-buy',
  imports: [ButtonModule],
  templateUrl: './reward-buy.component.html',
  styleUrl: './reward-buy.component.less'
})
export class RewardBuyComponent {
  @Input('reward') reward!: Reward;
  @Input('availablePoints') availablePoints!: number;
  @Output('onBuy') onBuy: EventEmitter<boolean> = new EventEmitter();

  sending: boolean = false;

  async buy() {
    this.onBuy.emit(true);
  }

  get canAfford() { return this.availablePoints >= this.reward.value }
}
