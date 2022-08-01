import { Menu } from '@grammyjs/menu';
import { BotContext } from '../bot';
import { Admins } from '../database/models/AdminsModel';

export const AddAdminMenu = new Menu<BotContext>('add_admin')
    .text('Сохранить', async ctx => {
        const admin = ctx.session.admin;

        await Admins.create({
            username: admin
        });

        await ctx.deleteMessage();
        await ctx.reply(`Новый администратор \'${admin}\' успешно зарегистрирован.`);
    }).row()
    .text('Отмена', async ctx => {
        await ctx.deleteMessage();
        await ctx.reply('Отменено.');
    })

export const DelAdminMenu = new Menu<BotContext>('del_admin')
    .text('Удалить', async ctx => {
        const admin = ctx.session.admin;

        await Admins.destroy({
            where: {
                username: admin
            }
        });

        await ctx.deleteMessage();
        await ctx.reply(`Администратор ${admin} больше не администратор.`);
    }).row()
    .text('Отмена', async ctx => {
        await ctx.deleteMessage();
        await ctx.reply('Отменено.');
    });

