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

    id?: number;
    createdAt?: Date;
    completedAt?: Date;
    taskStart: Date;
    taskEnd?: Date;
    points?: number;
    task: Task;

    static taskListDtoToTaskList(dto: TaskListDTO): TaskList {
        return {
            ...dto,
            createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
            completedAt: dto.completedAt ? new Date(dto.completedAt) : undefined,
            taskStart: new Date(dto.taskStart),
            taskEnd: dto.taskEnd ? new Date(dto.taskEnd) : undefined,
        };
    }   
}
export interface TaskListDTO {
    id?: number;
    createdAt?: string;
    completedAt?: string;
    taskStart: string;
    taskEnd?: string;
    points?: number;
    task: Task;
}