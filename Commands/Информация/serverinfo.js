const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'Нет роли',
	ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
	NONE: 'Нету',
	LOW: 'Слабый',
	MEDIUM: 'Средний',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydeny: 'Sydeny',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
};

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['server', 'guild', 'guildinfo'],
			description: 'Показывает информацию о сервере, в котором она написана.',
			category: 'Информация',
            guildOnly: true,
			nsfw: false,
			args: false
		});
	}

	async run(message) {
		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;

		const embed = new MessageEmbed()
			.setDescription(`**Информация о сервере для __${message.guild.name}__**`)
			.setColor('RED')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('Основное', [
				`**❯ Название:** ${message.guild.name}`,
				`**❯ ID:** ${message.guild.id}`,
				`**❯ Владелец:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
				`**❯ Регион:** ${regions[message.guild.region]}`,
				`**❯ Уровень буста:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
				`**❯ Фильтр нежелательного контента:** ${filterLevels[message.guild.explicitContentFilter]}`,
				`**❯ Уровень верификации:** ${verificationLevels[message.guild.verificationLevel]}`,
				`**❯ Серввер создан:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
				'\u200b'
			])
			.addField('Статистика', [
				`**❯ Количество ролей:** ${roles.length}`,
				`**❯ Количество эмодзи:** ${emojis.size}`,
				`**❯ Количество обычных эмоддзи:** ${emojis.filter(emoji => !emoji.animated).size}`,
				`**❯ Количество анимированных эмодзи:** ${emojis.filter(emoji => emoji.animated).size}`,
				`**❯ Кол-во участников:** ${message.guild.memberCount}`,
				`**❯ Участники:** ${members.filter(member => !member.user.bot).size}`,
				`**❯ Боты:** ${members.filter(member => member.user.bot).size}`,
				`**❯ Количество текстовых каналов:** ${channels.filter(channel => channel.type === 'text').size}`,
				`**❯ Количество голосовых каналов:** ${channels.filter(channel => channel.type === 'voice').size}`,
				`**❯ Количество бустов:** ${message.guild.premiumSubscriptionCount || '0'}`,
				'\u200b'
			])
			.addField('Активность', [
				`**❯ Онлайн:** ${members.filter(member => member.presence.status === 'online').size}`,
				`**❯ Не активны:** ${members.filter(member => member.presence.status === 'idle').size}`,
				`**❯ Не беспокоить:** ${members.filter(member => member.presence.status === 'dnd').size}`,
				`**❯ Оффлайн:** ${members.filter(member => member.presence.status === 'offline').size}`,
				'\u200b'
			])
			.addField(`Роли [${roles.length - 1}]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'Нету')
			.setTimestamp();
		message.channel.send(embed);
	}

};