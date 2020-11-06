const Command = require('../../Structures/Command.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Reloads all the commands',
            category: 'Owner',
            ownerOnly: true
		});
	}

	async run(message) {
		this.client.utils.loadCommands()
		.then(() => message.channel.send(`Все команды перезагружены!`))
		.catch(err => message.channel.send(`Произошла ощибка при перезагрузке команд!\n**Ошибка:**\`\`\`xl\n${err}\n\`\`\``));
	}
		
};
