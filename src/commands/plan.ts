import Telegraf, { ContextMessageUpdate } from "telegraf";

const Markup = require('telegraf/markup')

export default async (bot: Telegraf<ContextMessageUpdate>, ctx: ContextMessageUpdate) => {
    if (!ctx.chat || !ctx.message) return ctx.reply("Invalid message");

    if (ctx.chat.type != "private")
        await ctx.deleteMessage();

    return await ctx.reply('Command received', Markup.inlineKeyboard([
        Markup.callbackButton('Attend', 'plan_attend'),
        Markup.callbackButton('Can\' Attend', 'plan_cantattend')
    ]).extra());
};