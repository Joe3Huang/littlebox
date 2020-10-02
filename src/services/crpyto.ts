import * as crypto from 'crypto';

export class Crypto {
    private algorithm = 'aes-256-ctr';

    public secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

    private iv: Buffer;

    constructor(secretKey: string) {
        this.iv = crypto.randomBytes(16);
        this.secretKey = secretKey;
    }

    public encrypt(text: string): { iv: string; content: string } {
        const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, this.iv);

        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
        return {
            iv: this.iv.toString('hex'),
            content: encrypted.toString('hex'),
        };
    }

    decrypt(hash: { iv: string; content: string }): string {
        const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, Buffer.from(hash.iv, 'hex'));

        const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

        return decrpyted.toString();
    }
}
