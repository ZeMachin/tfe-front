import { Metric } from "./Metric";

export class Task {
    constructor(task: Task) {
        this.id = task.id;
        this.name = task.name;
        this.metrics = task.metrics;
        this.new = task.new;
    }
    id: number;
    name: string;
    metrics: Metric[];
    new?: boolean = false;
}
