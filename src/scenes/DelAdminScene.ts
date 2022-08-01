import { Scene } from 'grammy-scenes';
import { BotContext } from '../bot';
import { Admins } from '../database/models/AdminsModel';
import { DelAdminMenu } from '../menus/AdminMenus';

export const DelAdminScene = new Scene<BotContext>('del_admin');

DelAdminScene.do(async ctx => {
    await ctx.reply(
        'Ну что, раз уж мы тут собрались - давай решать задачи, путник.\n\n' +
        'Сейчас давайте удалим админа, если не хотим что-бы он мог управлять \'ключами\'\n\n' +
        'Введите \'username\' действующего админа без @. Например \'nebo9\' (без кавычек)'
    );
});

DelAdminScene.wait().on('message:text', async ctx => {
    const admin = ctx.session.admin = ctx.message.text;

    const findAdmin = await Admins.findOne({
        where: {
            username: admin
        }
    });

    if (findAdmin === null) {
        await ctx.reply(`Админ \'${admin}\' не зарегистирован\n\nЕсли хотите удалить другого админа, напишите /del_admin`);
        return ctx.scene.exit();
    }

    await ctx.reply(
        'Отлично!\n' +
        `На удаление идёт \'${admin}\'`
        , { reply_markup: DelAdminMenu });

    ctx.scene.exit();
});