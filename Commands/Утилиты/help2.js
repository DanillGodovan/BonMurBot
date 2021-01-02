const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['хелп2'],
			description: 'Показывает все команды у бота',
			category: 'Утилиты',
			usage: '[command]',
            guildOnly: false,
			nsfw: false,
			args: false
		});
	}

	async run(message, [command]) {
		const embed = new MessageEmbed()
			.setColor('RED')
			.setAuthor(`${message.guild.name} Меню помощи`, message.guild.iconURL({ dynamic: true }))
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(`Запрошено ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		if (command) {
			const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

			if (!cmd) return message.channel.send(`Указана неверная команда. \`${command}\``);

			embed.setAuthor(`${this.client.utils.capitalise(cmd.name)} Помощь команды`, this.client.user.displayAvatarURL());
			embed.setDescription([
				`**❯ Псевдоним:** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(' ') : 'Нету псевдонимов'}`,
				`**❯ Описание:** ${cmd.description ? cmd.description.map(desc => `\`${desc}\``).join(' ') : 'Нету описания'}`,
				`**❯ Категория:** ${cmd.category}`,
				`**❯ Использование:** ${cmd.usage}`
			]);

			return message.channel.send(embed);
		} else {
			embed.setDescription([
				`Это все доступные команды для ${message.guild.name}`,
				`Префикс бота: ${this.client.prefix}`,
				`Параметры команд: \`<>\` обязателен & \`[]\` необязателен`
			]);
			let categories;
            if (!this.client.owners.includes(message.author.id)) {
				categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'Owner').map(cmd => cmd.category));
			} else {
				categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'Verification').map(cmd => cmd.category));
			}

			for (const category of categories) {
				embed.addField(`**${this.client.utils.capitalise(category)}**`, this.client.commands.filter(cmd =>
					cmd.category === category).map(cmd => `\`${cmd.name}\``).join(' '));
			}
			return message.channel.send(embed);
		}
	}

};