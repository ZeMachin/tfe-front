export class Metric {
    constructor(metric: Metric) {
        this.id = metric.id;
        this.name = metric.name;
        this.weight = metric.weight;
    }
    id: number;
    name: string;
    weight?: number;
}
