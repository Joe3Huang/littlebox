import { EventDataInterface } from './Event';
import fs from 'fs';
export class EventStore {
    public async save<T extends EventDataInterface>(data: T[]): Promise<void> {
        fs.appendFileSync('events.json', JSON.stringify(data));
    }

    public async read(): Promise<any> {
        return JSON.parse(fs.readFileSync('./events.json', 'utf8'));
    }
}
