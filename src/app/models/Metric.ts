export class Metric {
    constructor(metric: Metric) {
        this.id = metric.id;
        this.name = metric.name;
    }
    id: number;
    name: string;
}
