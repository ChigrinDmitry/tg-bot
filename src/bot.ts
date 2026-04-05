import 'dotenv/config';
import { Bot, session } from 'grammy';
import { BotContext, SessionData } from './types/bot-types.js';
import { startHandler } from './handlers/start.js';
import { aiAnswerHandler } from './handlers/ai-answer.js';
import { Hears } from './consts/hears.js';
import { HelpHandler } from './handlers/help.js';

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
