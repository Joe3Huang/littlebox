import { Event } from './Event';

class Queue {
    public static instance: Queue;
    events: Event[] = [];
    constructor() {
        if (!Queue.instance) Queue.instance = this;
        return Queue.instance;
    }
    public addEvent(event: Event): void {
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

    private storeEvent(): void {
        console.log('storeEvent');
    }
}

export default new Queue();
