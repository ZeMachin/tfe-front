import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { ButtonModule } from 'primeng/button';
import { Metric } from '../../../../models/Metric';
import { FamilyService } from '../../../../services/family.service';
import { UserService } from '../../../../services/user.service';
import { MetricComponent } from '../metric/metric.component';

@Component({
  selector: 'app-edit-metrics',
  imports: [MetricComponent, ButtonModule],
  templateUrl: './edit-metrics.component.html',
  styleUrl: './edit-metrics.component.less'
})
export class EditMetricsComponent implements OnInit {
  metrics: Metric[] = [];

  constructor(
    private userService: UserService,
    private familyService: FamilyService
  ) { }


  async ngOnInit(): Promise<void> {
    this.refreshMetrics();
  }

  async refreshMetrics() {
    if (this.userService.family)
      this.metrics = await this.familyService.getFamilyMetrics(this.userService.family);
  }

  addMetric() {
    this.metrics.push(new Metric({ name: this.getDefaultMetricName(), id: -1, new: true }));
  }

  getDefaultMetricName(): string {
    let name = 'My new metric';
    let i = 1;
    while (this.metrics.map((t) => t.name).includes(name)) {
      name = `My new metric ${i++}`;
    }
    return name;
  }

  onDeleteMetric($event: boolean, metric: Metric) {
    // if ($event) {
    _.remove(this.metrics, metric);
    // } else {
    //   this.refreshMetrics();
    // }
  }
}
