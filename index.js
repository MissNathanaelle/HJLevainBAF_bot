const fs = require("fs");
// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
var { idsalons } = require('./config.json');
const { MessageEmbed } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

// When the client is ready, run this code (only once)
client.on('ready', () => {
	console.log('Ready!');
	client.user.setActivity("Coucou :)");
});

//member add

client.on('guildMemberAdd', member => {
	
let role = member.guild.roles.cache.find(r => r.id === "887798844543361114");
const channel = member.guild.channels.cache.get("883497875227697195");

var embed= new MessageEmbed()
    .setTitle("Nouveau membre")
    .setColor("GREEN")
    .setDescription("\`\`\` Je te souhaite la bienvenue  " + member.user.username + "  !\`\`\`")
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp()
    .setFooter("Habitat Jeunes le Levain")
	channel.send({ embeds: [embed] });
	member.roles.add(role);

    
});







client.on('messageCreate', async msg => {
	
	//Salons Actualités / Activités / emploi-formation
	let salons = ["890728221908295700","890527394832719912", "883497875227697196","887727682689839135"]
	for(let i = 0; i < salons.length; i++) {
		if(msg.channel.id === salons[i]){
			const thread = await msg.startThread({
				name: "Commentaires",
				autoArchiveDuration: 1440,
			});
			console.log(`Created thread: ${thread.name}`);
			msg.react('❤️');
		}
	}	

	//salons: idées de sortie & partages

	let salons1 = ("891668671234179122");
		if(msg.channel.id === salons1){
			const thread = await msg.startThread({
				name: "Commentaires",
				autoArchiveDuration: 1440,
			});
			console.log(`Created thread: ${thread.name}`);
			msg.react('❤️');
		}

	// salons: aide et conseils
	let salons2 = ("886155751649845248");
		if(msg.channel.id === salons2){
			const thread = await msg.startThread({
				name: "Réponses",
				autoArchiveDuration: 1440,
			});
			console.log(`Created thread: ${thread.name}`);
			msg.react('✅');
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