import Telegraf, { ContextMessageUpdate } from "telegraf";

export const setTunnelWebhook = (tBot: Telegraf<ContextMessageUpdate>, port: number) => {
    const localtunnel = require('localtunnel');
    const tunnel = localtunnel(port, function (err: string, tunnel: any) {
        if (err) console.log("Unable to generate localtunnel");

        setWebhook(tBot, tunnel.url);
    });

    tunnel.on('close', function() {
        process.exit();
    });
};

export const setWebhook = (tBot: Telegraf<ContextMessageUpdate>, url: string) => {
    console.log(`Webhook set to: ${url}`);
    tBot.telegram.setWebhook(`${url}/telegram-api-webhook`);
};