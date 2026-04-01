import { bot } from './bot';

bot.start({onStart: () => {
    console.log('bot started')
}})