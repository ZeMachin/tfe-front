import { FamilyMemberStatus } from "./FamilyMemberStatus";
import { FamilyMemberTaskMetricPreference } from "./FamilyMemberTaskMetricPreference";
import { Task } from "./Task";
import { TaskList } from "./TaskList";

export class FamilyMember {
    constructor(member: FamilyMember) {
        this.id = member.id;
        this.name = member.name;
        this.color = member.color;
        this.requiresPin = member.requiresPin;
        this.status = member.status;
        this.taskLists = member.taskLists;
        this.metricPreferences = member.metricPreferences;
        this.favoriteTasks = member.favoriteTasks;
        this.favoriteTasks = member.favoriteTasks;
        this.leastFavoriteTasks = member.leastFavoriteTasks;
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
}