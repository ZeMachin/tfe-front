import { FamilyMember } from "./FamilyMember";
import { RecurrenceType } from "./Recurrence";
import { Task } from "./Task";

export class TaskList {
    constructor(dto: TaskList) {
        Object.assign(this, dto);
        this.createdAt = dto.createdAt ? new Date(dto.createdAt) : dto.createdAt;
        this.completedAt = dto.completedAt ? new Date(dto.completedAt) : dto.completedAt;
        this.taskStart = new Date(dto.taskStart);
        this.taskEnd = dto.taskEnd ? new Date(dto.taskEnd) : dto.taskEnd;
        this.task = new Task(dto.task);
        this.member = dto.member ? new FamilyMember(dto.member) : dto.member;
    }

    id?: number;
    createdAt?: Date;
    completedAt?: Date;
    taskStart: Date;
    taskEnd?: Date;
    points?: number;
    task: Task;
    member?: FamilyMember;
    recurrence?: RecurrenceType;

    static taskListDtoToTaskList(dto: TaskListDTO): TaskList {
        return new TaskList({
            ...dto,
            createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
            completedAt: dto.completedAt ? new Date(dto.completedAt) : undefined,
            taskStart: new Date(dto.taskStart),
            taskEnd: dto.taskEnd ? new Date(dto.taskEnd) : undefined,
            recurrence: dto.recurrence ? new RecurrenceType(dto.recurrence) : undefined
        } as TaskList);
    }   

    get status(): CompletionStatus {
        return this.completedAt ? CompletionStatus.completed : (this.taskEnd ? this.taskEnd.getTime() < Date.now() ? CompletionStatus.late : CompletionStatus.pending : CompletionStatus.pending)
    }
}

export enum CompletionStatus {
  'late' = 'late',
  'completed' = 'completed',
  'pending' = 'pending'
} 

export interface TaskListDTO {
    id?: number;
    createdAt?: string;
    completedAt?: string;
    taskStart: string;
    taskEnd?: string;
    points?: number;
    task: Task;
    recurrence: RecurrenceType;
}