import { BotContext } from "../types/bot-types";

export async function startHandler(ctx: BotContext) {
    const name = ctx.from?.first_name ?? 'Господин';

    await ctx.reply(
        `Привет, ${name}!
        Я твой личный консультант.
        /start - старт
        /ai - задать вопрос ИИ-помощнику
        /test - сгенерировать тест по теме
        `
    )
}