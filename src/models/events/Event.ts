import eventProcessor from './EventProcessor';
export enum EventTypes {
    addUser,
}

export interface EventDataInterface {
    type: EventTypes;
    createdDate: Date;
}

export abstract class Event<T extends EventDataInterface> {
    constructor(private data: T) {
        eventProcessor.addEvent(this);
    }
    abstract async run(): Promise<void>;
}
