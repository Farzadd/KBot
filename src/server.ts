import Telegraf from 'telegraf';
import * as express from "express";
import planCommand from './commands/plan';
import { setWebhook, setTunnelWebhook } from './webhook';
import * as config from 'config';

/* Figure out the parameters */
const host = process.env.HOST;
const port: number = Number(process.env.PORT) || 3000;

/* Create a new Telegraf bot */
const tBot = new Telegraf(config.get("telegram.token"));

/* Register the webhook with telegram */
if (!host) {
  setTunnelWebhook(tBot, port);
} else {
  setWebhook(tBot, host);
}

/* Register all the bot commands */
tBot.command('plan', (ctx) => planCommand(tBot, ctx));
tBot.on('text', ({ replyWithHTML }) => replyWithHTML('<b>Hello</b>. This is KoolKids Bot... WIP!'))

/* Start the express server */
const app: express.Application = express();
app.get('/', (_, res) => res.send('/< Bot'));
app.use(tBot.webhookCallback('/telegram-api-webhook'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});