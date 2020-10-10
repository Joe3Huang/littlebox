import queue from './Queue';
export enum EventTypes {
    addUser,
}
export class Event {
    public type: EventTypes;
    public createdDate: Date = new Date();
    private func: () => {};
    constructor(type: EventTypes, func: () => {}) {
        this.type = type;
        this.func = func;
        queue.addEvent(this);
    }
    async run(): Promise<void> {
        await this.func();
    }
}
