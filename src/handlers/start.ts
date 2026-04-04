import { Keyboard } from "grammy";
import { BotContext } from "../types/bot-types";
import { Hears } from "../consts/hears";

const keyboard = new Keyboard()
    .text(Hears.AI_HELPER)
    .text(Hears.TEST_GENERATOR)
    .text(Hears.HELP)
    .resized()
    .persistent()

export async function startHandler(ctx: BotContext) {
    const name = ctx.from?.first_name ?? 'Господин';

    await ctx.reply(
        `Привет, ${name}!
        Я твой личный консультант.
        /start - старт
        /ai - задать вопрос ИИ-помощнику
        /test - сгенерировать тест по теме
        `, { reply_markup: keyboard }
    )
} 