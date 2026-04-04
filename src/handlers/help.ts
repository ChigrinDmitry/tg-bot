import { BotContext } from "../types/bot-types";

export async function HelpHandler(ctx: BotContext) {
    await ctx.reply(`
        /start - старт
        /ai - задать вопрос ИИ-помощнику
        /test - сгенерировать тест по теме
    `)
}