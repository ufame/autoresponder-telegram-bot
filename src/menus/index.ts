import { Composer } from 'grammy';

import { BotContext } from '../bot';
import { AddKeyMenu, DelKeyMenu, GetKeysMenu } from './KeyMenus';
import { AddAdminMenu, DelAdminMenu } from './AdminMenus';

export const menus = new Composer<BotContext>(
    AddKeyMenu,
    DelKeyMenu,
    GetKeysMenu,
    AddAdminMenu,
    DelAdminMenu
);