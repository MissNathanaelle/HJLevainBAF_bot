const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Le bot te réponds "pong!"'),
	new SlashCommandBuilder().setName('serveur').setDescription('Affiche l\'information du serveur'),
	new SlashCommandBuilder().setName('membre').setDescription('Affiche l\'information de l\'utilisateur'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Les commandes de \'application ont été enregistrées avec succès.'))
	.catch(console.error);