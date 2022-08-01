import { Scene } from 'grammy-scenes';

import { BotContext } from '../bot';
import { GetKeysMenu } from "../menus/KeyMenus";

export const GetKeysScene = new Scene<BotContext>('get_keys');

GetKeysScene.do(async ctx => {
   await ctx.reply('Список действующих \'ключей\':', {reply_markup: GetKeysMenu});
});