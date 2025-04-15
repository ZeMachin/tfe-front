import { Metric } from "./Metric";

export class FamilyMemberTaskMetricPreference {
    constructor(familyMemberTaskMetricPreference: FamilyMemberTaskMetricPreference) {
        this.id = familyMemberTaskMetricPreference.id;
        this.weight = familyMemberTaskMetricPreference.weight;
        this.metric = familyMemberTaskMetricPreference.metric;
    }
    id?: number;
    weight: number;
    metric: Metric;
}
