import {Ctx, Message, On, Start, Update} from "nestjs-telegraf";
import {Scenes, Telegraf} from "telegraf";
import {ConfigService} from "@nestjs/config";
import {ChatgptService} from "@src/chatgpt/chatgpt.service";

type Context = Scenes.SceneContext;

@Update()
export class TelegramService extends Telegraf<Context> {

    constructor(private readonly configService: ConfigService, private readonly chatGptService: ChatgptService) {
        super(configService.get<string>('TELEGRAM_API'));
    }
    @Start()
    onStart(@Ctx() ctx: Context) {
         ctx.replyWithHTML(
            `<b>Hello, ${ctx.from.username}</b>.
I'm ChatGPT Bot! Enter you request. \t&#128173;`
        );
    }

    @On('text')
    onMessage(@Message('text') message: string, @Ctx() ctx: Context) {
        return this.chatGptService.generateResponse(message);
    }

}
