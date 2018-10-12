import { ContextMessageUpdate } from "telegraf";

export default (ctx: ContextMessageUpdate) => {
    console.log(ctx.message);
    return ctx.reply('Command received');
};