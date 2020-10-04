import { v4 as uuid } from 'uuid';
import * as crypto from 'crypto';

export class User {
    private id: string = uuid();
    public email = '';
    public firstName = '';
    public lastName = '';
    private pwHash = '';
    public calendar: string[] = [];
    public crytobox: string[] = [];
    public static fromJSON(json: any): User {
        const user = new User();
        user.email = json.email;
        user.firstName = json.firstName;
        user.lastName = json.lastName;
        user.pwHash = json.phash;
        user.calendar = json.calendar;
        user.crytobox = json.crytobox;
        return user;
    }

    public static async hash(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const salt = crypto.randomBytes(8).toString('hex');
            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                resolve(salt + ':' + derivedKey.toString('hex'));
            });
        });
    }

    public async verify(password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const [salt, key] = this.pwHash.split(':');
            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                resolve(key == derivedKey.toString('hex'));
            });
        });
    }
}
