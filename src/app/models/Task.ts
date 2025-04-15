import { Metric } from "./Metric";

export class Task {
    constructor(task: Task) {
        this.id = task.id;
        this.name = task.name;
        this.metrics = task.metrics;
    }
    id: number;
    name: string;
    metrics: Metric[];
}
