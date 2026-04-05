import 'dotenv/config';
import { Bot, session } from 'grammy';
import { BotContext, SessionData } from './types/bot-types';
import { startHandler } from './handlers/start';
import { aiAnswerHandler } from './handlers/ai-answer';
import { Hears } from './consts/hears';
import { HelpHandler } from './handlers/help';

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
    throw new Error('BOT_TOKEN is not set in .env file');
}

export const bot = new Bot<BotContext>(BOT_TOKEN);

bot.use(session<SessionData, BotContext>({
    initial: () => ({
        waitingForAI: false
    })
}))

bot.command('start', startHandler);

bot.hears(Hears.AI_HELPER, async (ctx, next) => {
    ctx.session.waitingForAI = true;
    ctx.reply('задавайте вопрос');
});
bot.hears(Hears.TEST_GENERATOR, aiAnswerHandler)
bot.hears(Hears.HELP, HelpHandler)

bot.on('message:text', aiAnswerHandler);
