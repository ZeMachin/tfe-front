import { Task } from "./Task";

export class TaskList {
    constructor(taskList: TaskList) {
        this.id = taskList.id;
        this.createdAt = taskList.createdAt;
        this.completedAt = taskList.completedAt;
        this.taskStart = taskList.taskStart;
        this.taskEnd = taskList.taskEnd;
        this.task = taskList.task;
    }

    id: number;
    createdAt: Date;
    completedAt?: Date;
    taskStart: Date;
    taskEnd: Date;
    points?: number;
    task: Task;
}
