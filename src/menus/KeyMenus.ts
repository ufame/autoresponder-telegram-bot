import {Menu, MenuRange} from '@grammyjs/menu';
import { Keys } from '../database/models/KeysModel';
import { BotContext } from '../bot';

export const AddKeyMenu = new Menu<BotContext>('add_key')
    .text('Сохранить', async ctx => {
        const key = ctx.session.key;
        const answer = ctx.session.answer;

        await Keys.create({
            key: key.toLowerCase(),
            answer: answer
        });

        await ctx.deleteMessage();
        await ctx.reply(`Успешно записано:\n\nКлюч: ${key}\nОтвет: ${answer}`);
    }).row()
    .text('Отмена', async ctx => {
        await ctx.deleteMessage();
        await ctx.reply('Отменено.');
    })

export const DelKeyMenu = new Menu<BotContext>('del_key')
    .text('Удалить', async ctx => {
        const key = ctx.session.key;
        const answer = ctx.session.answer;

        await Keys.destroy({
            where: {
                key: key.toLowerCase(),
                answer: answer
            }
        });

        await ctx.deleteMessage();
        await ctx.reply(`Успешно удалено:\n\nКлюч: ${key}\nОтвет: ${answer}`);
    }).row()
    .text('Отмена', async ctx => {
        await ctx.deleteMessage();
        await ctx.reply('Отменено.');
    })

export const GetKeysMenu = new Menu<BotContext>('get_keys')
    .dynamic(async (): Promise<MenuRange<any>> => {
        const range = new MenuRange();
        const { count, rows } = await Keys.findAndCountAll();

        for await (let row of rows) {
            range
                .text(
                    row.key,
                    async ctx => {
                        await ctx.reply(`Вы выбрали следующее:\nКлюч: \'${row.key}\'\'Ответ: \'${row.answer}\'`);
                    })
        }

        return range;
    })