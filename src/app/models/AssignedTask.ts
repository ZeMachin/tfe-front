import { CompletionStatus } from "./CompletionStatuts";

export class AssignedTask {
    constructor(dto: AssignedTask) {
        Object.assign(this, dto);
        this.createdAt = dto.createdAt ? new Date(dto.createdAt) : dto.createdAt;
        this.completedAt = dto.completedAt ? new Date(dto.completedAt) : dto.completedAt;
        this.start = new Date(dto.start);
        this.end = dto.end ? new Date(dto.end) : dto.end;
    }

    id?: number;
    createdAt?: Date;
    completedAt?: Date;
    start: Date;
    end?: Date;

    static assignedTaskDtoToAssignedTask(dto: AssignedTaskDTO): AssignedTask {
        return new AssignedTask({
            ...dto,
            createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
            completedAt: dto.completedAt ? new Date(dto.completedAt) : undefined,
            start: new Date(dto.start),
            end: dto.end ? new Date(dto.end) : undefined,
        } as AssignedTask);
    }

    get status(): CompletionStatus {
        if (this.completedAt)
            return CompletionStatus.completed;
        else if (Date.now() < this.start.getTime())
            return CompletionStatus.unstarted;
        else if (this.end && this.end.getTime() < Date.now())
            return CompletionStatus.late;
        else
            return CompletionStatus.pending;
    }
}

export interface AssignedTaskDTO {
    id?: number;
    createdAt?: string;
    completedAt?: string;
    start: string;
    end?: string;
}