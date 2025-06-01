export class RecurrenceType {
    constructor(dto: RecurrenceType) {
        Object.assign(this, dto);
        this.name = dto.name;
    }
    id?: number;
    name: string;
}