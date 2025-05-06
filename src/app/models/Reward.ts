export class Reward {
    constructor(reward: Reward) {
        this.id = reward.id;
        this.name = reward.name;
        this.value = reward.value;
        this.currentStock = reward.currentStock;
        this.new = reward.new;
    }
    id: number;
    name: string;
    value: number;
    currentStock?: number;
    new?: boolean = false;
}
