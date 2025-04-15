import { FamilyMember } from "./FamilyMember";
import { HouseholdType } from "./HouseholdType";
import { Metric } from "./Metric";
import { Reward } from "./Reward";
import { Task } from "./Task";

export class Family {
    constructor(family: Family) {
        this.id = family.id;
        this.email = family.email;
        this.displayName = family.displayName;
        this.settings = family.settings;
        this.configStep = family.configStep;
        this.householdType = family.householdType;
        this.members = family.members;
        this.tasks = family.tasks;
        this.metrics = family.metrics;
        this.rewards = family.rewards;
    }
    id: number;
    email: string;
    displayName: string;
    settings: Settings;
    configStep: number;
    householdType: HouseholdType;
    members?: FamilyMember[];
    tasks?: Task[];
    metrics?: Metric[];
    rewards?: Reward[];
}

export interface Settings {
    leaderboard: boolean,
    rewards: boolean
}