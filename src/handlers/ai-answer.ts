import { askDeepSeek } from "../services/ai";
import { BotContext } from "../types/bot-types";


export async function aiAnswerHandler(ctx: BotContext, next: () => Promise<void>) {
    const message = ctx.message?.text;

    if (!message) {
        return next();
    }

    const thinkingMessage = await ctx.reply('thinking...');

    const safeDelete = () =>
        ctx.api.deleteMessage(ctx.chat!.id, thinkingMessage.message_id);

    try {
        const response = await askDeepSeek(message);
        await ctx.reply(response);
    } catch (error) {
        console.log(error);
        await ctx.reply('произошла ошибка при обработке вашего запроса');
    } finally {
        safeDelete()
    }
} 