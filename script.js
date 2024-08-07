const { NlpManager } = require('node-nlp');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const strings = JSON.parse(fs.readFileSync('strings.json', 'utf8'));
const answers = JSON.parse(fs.readFileSync('answers.json', 'utf8'));

const manager = new NlpManager({ languages: ['pt'] });


Object.entries(strings).forEach(([key, value]) => {
    manager.addDocument('pt', key, value);
});


Object.entries(answers).forEach(([key, value]) => {
    manager.addAnswer('pt', key, value);
});

(async () => {
    await manager.train();
    manager.save();

    const bott = new TelegramBot('7331736184:AAH5KO-X0DrTT0f3APAkgSR01bKo4HLhs_k', { polling: true });

    bott.onText(/\/echo (.+)/, (msg, match) => bott.sendMessage(msg.chat.id, match[1]));

    bott.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const response = await manager.process('pt', msg.text.toLowerCase());
        const reply = response.answer || "Desculpe, não entendi sua mensagem. 😢\n\nPoderia repetir de uma forma diferente?";
        bott.sendMessage(chatId, reply, { parse_mode: 'HTML' });
    });
})();
