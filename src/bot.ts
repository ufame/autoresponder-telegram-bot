import {
    Bot,
    Context,
    session,
    SessionFlavor
} from 'grammy';

import {
    ScenesFlavor,
    ScenesSessionFlavor
} from 'grammy-scenes';

import { menus } from './menus';
import { scenes } from './scenes';
import { Settings } from './settings';
import { Keys } from './database/models/KeysModel';

type SessionData = ScenesSessionFlavor & {
    key: string,
    answer: string,
    admin: string
};

export type BotContext = Context & SessionFlavor<SessionData> & ScenesFlavor;

(async () => {
    await Settings.loadAllSettings('./appsettings.json');
    const botToken = Settings.getBotToken();

    const bot = new Bot<BotContext>(botToken);

    bot.use(
        session({
            initial: () => ({}),
        })
    );
    bot.use(menus);
    bot.use(scenes.manager());
    bot.use(scenes);

    bot.command('add_key', async ctx => {
        if (ctx.chat.type !== 'private') {
            return;
        }

        const username = ctx.from?.username || '';

        if (!await Settings.isAdmin(username)) {
            return;
        }

        await ctx.scenes.enter('add_key');
    });

    bot.command('del_key', async ctx => {
        if (ctx.chat.type !== 'private') {
            return;
        }

        const username = ctx.from?.username || '';

        if (!await Settings.isAdmin(username)) {
            return;
        }

        await ctx.scenes.enter('del_key');
    });

    bot.command('get_keys', async ctx => {
        if (ctx.chat.type !== 'private') {
            return;
        }

        const username = ctx.from?.username || '';

        if (!await Settings.isAdmin(username)) {
            return;
        }

        await ctx.scenes.enter('get_keys');
    });

    bot.command('add_admin', async ctx => {
        if (ctx.chat.type !== 'private') {
            return;
        }

        const username = ctx.from?.username || '';

        if (!Settings.isOwner(username)) {
            return;
        }

        await ctx.scenes.enter('add_admin');
    });

    bot.command('del_admin', async ctx => {
        if (ctx.chat.type !== 'private') {
            return;
        }

        const username = ctx.from?.username || '';

        if (!Settings.isOwner(username)) {
            return;
        }

        await ctx.scenes.enter('del_admin');
    });

    bot.on('message:text', async ctx => {
        const message = ctx.message.text;

        const findKey = await Keys.findOne({
            where: {
                key: message.toLowerCase()
            }
        });

        if (findKey !== null) {
            //@ts-ignore
            await ctx.reply(findKey.answer, {reply_to_message_id: ctx.message.message_id});
        }
    });

    await bot.init();

    console.log(`Bot @${bot.botInfo.username} started`);
    await bot.start();
})();