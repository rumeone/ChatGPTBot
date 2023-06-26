import {Ctx, Message, On, Start, Update} from "nestjs-telegraf";
import {Scenes, Telegraf} from "telegraf";

type Context = Scenes.SceneContext;

@Update()
export class TelegramService extends Telegraf<Context> {
    @Start()
    onStart(@Ctx() ctx: Context) {
         ctx.replyWithHTML(
            `<b>Hello, ${ctx.from.username}</b>.
I'm ChatGPT Bot! Enter you request. \t&#128173;`
        );
    }

    @On('text')
    onMessage(@Message('text') message: string, @Ctx() ctx: Context) {
        ctx.replyWithHTML(`<i>${message}</i>`)
    }

}
