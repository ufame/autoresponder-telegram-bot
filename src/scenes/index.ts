import { ScenesComposer } from 'grammy-scenes';

import { BotContext } from '../bot';
import { AddKeyScene } from './AddKeyScene';
import { DelKeyScene } from './DelKeyScene';
import { GetKeysScene } from './GetKeysScene';
import { AddAdminScene } from './AddAdminScene';
import { DelAdminScene } from './DelAdminScene';

export const scenes = new ScenesComposer<BotContext>(
    AddKeyScene,
    DelKeyScene,
    GetKeysScene,
    AddAdminScene,
    DelAdminScene
);