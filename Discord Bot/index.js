const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    console.log(message.content);
    if (message.content.startsWith('create')) {
        const url = message.content.split("create")[1];
        return message.reply({
            content: "Generating short ID" + url,
        });
    }
    message.reply({
        content: "Hello from bot"
    });
});

client.on('interactionCreate', async interaction => {
    console.log(interaction);
    await interaction.reply('Pong!')
});



// client.on('interactionCreate', async interaction => {
//     if (!interaction.isChatInputCommand()) return;

//     if (interaction.commandName === 'ping') {
//         await interaction.reply('Pong!');
//     }
// });

client.login('MTI3MjI1MjM2OTc2NTI2OTUwNQ.GEcEfM.5BudHXZBI4FDWkwjbWLkDAzcOwiP35GVeTNtEU');