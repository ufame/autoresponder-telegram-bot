import { readFile } from 'fs/promises';
import { Admins } from './database/models/AdminsModel';

export class Settings {
    private static botToken: string | undefined;
    private static botOwner: string | undefined;

    static async loadAllSettings(file: string) {
        const settings = JSON.parse(
            await readFile(file, { encoding: 'utf-8' })
        );

        this.botToken = settings.Telegram.botToken;
        this.botOwner = settings.Telegram.botOwner;
    }

    static getBotToken(): string {
        return <string>this.botToken;
    }

    static isOwner(username: string): boolean {
        return this.botOwner === username;
    }

    static async isAdmin(username: string): Promise<boolean> {
        if (this.isOwner(username)) {
            return true;
        }

        const user = await Admins.findOne({
            where: {
                username: username
            }
        });

        return user !== null;
    }
}
