import { Scene } from 'grammy-scenes';
import { BotContext } from '../bot';
import { AddKeyMenu } from '../menus/KeyMenus';
import { Keys } from '../database/models/KeysModel';

export const AddKeyScene = new Scene<BotContext>('add_key');

AddKeyScene.do(async ctx => {
    await ctx.reply(
        'Ну что, раз уж мы тут собрались - давай решать задачи, путник.\n\n' +
        'Сейчас давайте добавим фразу \'ключ\' на которую среагирует бот.'
    );
});

AddKeyScene.wait().on('message:text', async ctx => {
    const key = ctx.session.key = ctx.message.text;

    const findKey = await Keys.findOne({
        where: {
            key: key.toLowerCase()
        }
    });

    if (findKey !== null) {
        await ctx.reply(`Ключ \'${key}\' уже зарегистирован\n\nЕсли всё еще хотите добавить новый ключ, напишите /add_key`);
        return ctx.scene.exit();
    }

    await ctx.reply(
        'Отлично, маладес!\n' +
        `Мы зарегистрировали ключик \'${key}\'\n\n` +
        `Теперь нам нужно добавить ответ на этот ключ.\nОтвет будет отправляться в ответ на сообщение пользователя в котором было обнаружено \'${key}\'`
    );

    ctx.scene.resume();
});

AddKeyScene.wait().on('message:text', async ctx => {
    const key = ctx.session.key;
    const answer = ctx.session.answer = ctx.message.text;

    await ctx.reply(
        'Итак, дружочек\\-пирожочек\n' +
        `Мы зарегистрировали ответ \'${answer}\'\n\n` +
        'И теперь у нас имеется:\n' +
        `**Ключ**: \'${key}\'\n` +
        `**Ответ**: \'${answer}`
    , { parse_mode: 'MarkdownV2', reply_markup: AddKeyMenu });

    ctx.scene.exit();
});