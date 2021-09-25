// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');


// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// When the client is ready, run this code (only once)
client.on('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', async msg => {
	
	var salons = ['890728221908295700','890527394832719912', '883497875227697196']
	for(let i = 0; i < salons.length; i++) {
		if(msg.channel.id === salons[i]){
			const thread = await msg.startThread({
				name: "Commentaires",
				autoArchiveDuration: 1440,
			});
			console.log(`Created thread: ${thread.name}`);
		}
	}	
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	}
	else if (commandName === 'server') {
		await interaction.reply(`Nom du serveur: ${interaction.guild.name}\nNb de membres (total): ${interaction.guild.memberCount}`);
	}
	else if (commandName === 'user') {
		await interaction.reply(`Votre Tag: ${interaction.user.tag}\nVotre identifiant Discord: ${interaction.user.id}`);
	}
});

client.login(token);