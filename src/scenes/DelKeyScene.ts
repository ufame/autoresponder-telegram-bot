import { Scene } from 'grammy-scenes';
import { BotContext } from '../bot';
import { Keys } from '../database/models/KeysModel';
import { DelKeyMenu } from "../menus/KeyMenus";

export const DelKeyScene = new Scene<BotContext>('del_key');

DelKeyScene.do(async ctx => {
    await ctx.reply(
        'Раз уж вы тут, давайте найдем то, что нужно удалить!\n' +
        'Какой \'ключ\' вы хотите удалить? Напишите мне его'
    );
});

DelKeyScene.wait().on('message:text', async ctx => {
    const key = ctx.session.key = ctx.message.text;

    const findKey = await Keys.findOne({
        where: {
            key: key.toLowerCase()
        }
    });

    if (findKey === null) {
        await ctx.reply(`Ключика ${key} не найдено... Давайте по новой!`);
        return ctx.scene.exit();
    }

    //@ts-ignore
    const answer = findKey.answer;
    ctx.session.answer = answer;

    await ctx.reply(
        'Смотрите что я нашел для Вас:\n\n' +
        `Ключ: ${key}\n` +
        `Ответ: ${answer}`
    , { reply_markup: DelKeyMenu });

    ctx.scene.exit();
});