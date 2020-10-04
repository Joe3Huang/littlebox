export enum EventTypes {
    addUser,
}
export abstract class Event {
    public type: EventTypes;
    public createdDate: Date = new Date();
    public version: string;
    constructor(type: EventTypes, version: string) {
        this.type = type;
        this.version = version;
    }
    abstract run(): void;
}
