import { Scene } from 'grammy-scenes';
import { BotContext } from '../bot';
import { Admins } from '../database/models/AdminsModel';
import { AddAdminMenu } from '../menus/AdminMenus';

export const AddAdminScene = new Scene<BotContext>('add_admin');

AddAdminScene.do(async ctx => {
    await ctx.reply(
        'Ну что, раз уж мы тут собрались - давай решать задачи, путник.\n\n' +
        'Сейчас давайте добавим админа который сможет управлять \'ключами\'\n\n' +
        'Введите \'username\' нового админа без @. Например \'nebo9\' (без кавычек)'
    );
});

AddAdminScene.wait().on('message:text', async ctx => {
    const admin = ctx.session.admin = ctx.message.text;

    const findAdmin = await Admins.findOne({
        where: {
            username: admin
        }
    });

    if (findAdmin !== null) {
        await ctx.reply(`Админ \'${admin}\' уже зарегистирован\n\nЕсли хотите добавить другого админа, напишите /add_admin`);
        return ctx.scene.exit();
    }

    await ctx.reply(
        'Отлично!\n' +
        `Новым админом будет \'${admin}\'`
    , { reply_markup: AddAdminMenu });

    ctx.scene.exit();
});