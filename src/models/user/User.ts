import { v4 as uuid } from 'uuid';
import * as crypto from 'crypto';

export interface Email extends String {}

export class User {
    private id: string = uuid();
    public email: Email = '';
    public firstName: string = '';
    public lastName: string = '';
    private pwHash: string = '';
    public calendar: any[] = [];
    public crytobox: any[] = [];
    public static fromJSON(json: any) {
        const user = new User();
        user.email = json.email;
        user.firstName = json.firstName;
        user.lastName = json.lastName;
        user.pwHash = json.phash;
        user.calendar = json.calendar;
        user.crytobox = json.crytobox;
        return user;
    }

    public static async hash(password: string) {
        return new Promise((resolve, reject) => {
            const salt = crypto.randomBytes(8).toString('hex');
            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                resolve(salt + ':' + derivedKey.toString('hex'));
            });
        });
    }

    public async verify(password: string) {
        return new Promise((resolve, reject) => {
            const [salt, key] = this.pwHash.split(':');
            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                resolve(key == derivedKey.toString('hex'));
            });
        });
    }
}
