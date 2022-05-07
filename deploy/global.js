const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const getConfig = require("../util/getConfig");
const LoadCommands = require("../util/loadCommands");

// Posts slash commands to all guilds containing the bot
// Docs: https://discordjs.guide/interactions/slash-commands.html#global-commands
// https://github.com/discordjs/discord.js/tree/main/packages/rest
// https://github.com/discordjs/discord-api-types/
(async () => {
	const config = await getConfig();
	const rest = new REST({ version: "9" }).setToken(config.token);
	const commands = await LoadCommands().then((cmds) => {
		return cmds.slash;
	});
	
	console.log("Deploying commands to global...");
	await rest.put(Routes.applicationCommands(config.clientId), {
		body: commands,
	}).catch(console.log);
	console.log("Successfully deployed commands!");
})();
