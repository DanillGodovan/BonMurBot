const Event = require('../../Structures/Event');

module.exports = class extends Event {

	async run(message) {
		const mentionRegex = RegExp(`^<@!${this.client.user.id}>$`);
		const mentionRegexPrefix = RegExp(`^<@!${this.client.user.id}> `);

		if (message.author.bot) return;

		if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is \`${this.client.prefix}\`.`);

		const prefix = message.content.match(mentionRegexPrefix) ?
			message.content.match(mentionRegexPrefix)[0] : this.client.prefix;

		if(!message.content.startsWith(prefix)) return;	

		const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

		const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
		if (command) {
			if (command.ownerOnly && !this.client.utils.checkOwner(message.author.id)) {
				return message.reply("Это команда только для владельца бота.")
			}

			if(command.guildOnly && !message.guild) {
				return message.reply("Это команда доступна только на дискорд сервере.")
			}

			if(command.nsfw && !message.channel.nsfw) {
				return message.reply("Это команда используеться только в NSFW каналах.")
			}

			if (command.args && args.length) {
				return message.reply(`Это команда требует аргументов в функции, использовние: ${command.usage ?
				command.usage : "Эта команда не использует формат использования."}.`)
			}
			if (message.guld) {
			const userPermCheck = command.userPerms ? this.client.defaultPerms.add(command.userPerms) : this.client.defaultPerms;
			if(userPermCheck) {
				const missing = message.channel.permissionsFor(message.member).missing(userPermCheck)
				if(missing.length) {
					return message.reply(`У вас не хватает ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} прав доступа, вам они нужны для использования команды.`)
			}
		}
		const botPermCheck = command.userPerms ? this.client.defaultPerms.add(command.userPerms) : this.client.defaultPerms;
		if(botPermCheck) {
			const missing = message.channel.permissionsFor(message.member).missing(botPermCheck)
			if(missing.length) {
				return message.reply(`У вас не хватает ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} прав доступа, вам они нужны для использования команды.`)
			}
		}
	}
		
			command.run(message, args);
		}
	}

};