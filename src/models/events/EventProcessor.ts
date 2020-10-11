import { Event } from './Event';

class EventProcessor {
    public static instance: EventProcessor;
    events: Event<any>[] = [];
    constructor() {
        if (!EventProcessor.instance) EventProcessor.instance = this;
        return EventProcessor.instance;
    }
    public addEvent(event: Event<any>): void {
        this.events.push(event);
    }
    public run(): void {
        setInterval(async () => {
            if (this.events.length) {
                try {
                    await this.events[0].run();
                    this.events.shift();
                } catch (e) {
                    console.log(e);
                }
            }
        }, 0);
    }
}

export default new EventProcessor();
