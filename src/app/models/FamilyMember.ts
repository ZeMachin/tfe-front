import { FamilyMemberStatus } from "./FamilyMemberStatus";
import { FamilyMemberTaskMetricPreference } from "./FamilyMemberTaskMetricPreference";
import { Task } from "./Task";
import { TaskList } from "./TaskList";

export class FamilyMember {
    constructor(dto: FamilyMember) {
        this.id = dto.id;
        this.name = dto.name;
        this.color = dto.color;
        this.requiresPin = dto.requiresPin;
        this.status = dto.status;
        this.taskLists = dto.taskLists?.map((tl) => new TaskList(tl)) || [];
        this.metricPreferences = dto.metricPreferences;
        this.favoriteTasks = dto.favoriteTasks;
        this.favoriteTasks = dto.favoriteTasks;
        this.leastFavoriteTasks = dto.leastFavoriteTasks;
        this.points = dto.points;
        this.pin = dto.pin;
    }
    id: number;
    name: string;
    color: string;
    requiresPin: boolean;
    status: FamilyMemberStatus;
    taskLists?: TaskList[];
    metricPreferences?: FamilyMemberTaskMetricPreference[];
    favoriteTasks?: Task[];
    leastFavoriteTasks?: Task[];
    points: number;
    pin?: string;
}