import { AssignedTask, AssignedTaskDTO } from "./AssignedTask";
import { CompletionStatus } from "./CompletionStatuts";
import { FamilyMember } from "./FamilyMember";
import { RecurrenceType } from "./Recurrence";
import { Task } from "./Task";

export class TaskList {
    constructor(dto: TaskList) {
        Object.assign(this, dto);
        this.createdAt = dto.createdAt ? new Date(dto.createdAt) : dto.createdAt;
        this.completedAt = dto.completedAt ? new Date(dto.completedAt) : dto.completedAt;
        this.start = new Date(dto.start);
        this.end = dto.end ? new Date(dto.end) : dto.end;
        this.task = new Task(dto.task);
        this.member = dto.member ? new FamilyMember(dto.member) : dto.member;
        this.recurrenceEnd = dto.recurrenceEnd ? new Date(dto.recurrenceEnd) : dto.recurrenceEnd;
        this.assignedTasks = dto.assignedTasks?.map((t) => new AssignedTask(t));
    }

    id?: number;
    createdAt?: Date;
    completedAt?: Date;
    start: Date;
    end?: Date;
    points?: number;
    task: Task;
    member?: FamilyMember;
    recurrence?: RecurrenceType;
    recurrenceEnd?: Date;
    assignedTasks: AssignedTask[];

    static taskListDtoToTaskList(dto: TaskListDTO): TaskList {
        return new TaskList({
            ...dto,
            createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
            completedAt: dto.completedAt ? new Date(dto.completedAt) : undefined,
            start: new Date(dto.start),
            end: dto.end ? new Date(dto.end) : undefined,
            recurrence: dto.recurrence ? new RecurrenceType(dto.recurrence) : undefined,
            recurrenceEnd: dto.recurrenceEnd ? new Date(dto.recurrenceEnd) : undefined,
            assignedTasks: dto.assignedTasks?.map((t) => AssignedTask.assignedTaskDtoToAssignedTask(t))
        } as TaskList);
    }

    get status(): CompletionStatus {
        if (this.assignedTasks?.filter((at) => at.status === CompletionStatus.completed).length === this.assignedTasks?.length)
            return CompletionStatus.completed;
        else if (Date.now() < this.start.getTime())
            return CompletionStatus.unstarted;
        else if (this.assignedTasks?.filter((at) => at.status === CompletionStatus.late).length > 0)
            return CompletionStatus.late;
        else
            return CompletionStatus.pending;
    }
}
export interface TaskListDTO {
    id?: number;
    createdAt?: string;
    completedAt?: string;
    start: string;
    end?: string;
    points?: number;
    task: Task;
    recurrence: RecurrenceType;
    recurrenceEnd?: Date;
    assignedTasks: AssignedTaskDTO[];
}