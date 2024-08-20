import { REST, Routes } from 'discord.js';

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
];

const rest = new REST({ version: '10' }).setToken('MTI3MjI1MjM2OTc2NTI2OTUwNQ.GEcEfM.5BudHXZBI4FDWkwjbWLkDAzcOwiP35GVeTNtEU');

try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands("1272252369765269505"), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}