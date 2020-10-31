const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['user', 'ui'],
			description: 'Показывает всю информацию о пользователе или о указанном пользователе.',
			category: 'Информация',
			usage: '[user]',
            guildOnly: true,
			nsfw: false,
			args: false
		});
	}

	async run(message, [target]) {
		const member = message.mentions.members.last() || message.guild.members.cache.get(target) || message.member;
		const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);
		const userFlags = member.user.flags.toArray();
		const embed = new MessageEmbed()
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(member.displayHexColor || 'RED')
			.addField('User', [
				`**❯ Никнейм:** ${member.user.username}`,
				`**❯ Дискриминатор:** ${member.user.discriminator}`,
				`**❯ ID:** ${member.id}`,
				`**❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
				`**❯ Аватар:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
				`**❯ Создан:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
				`**❯ Статус:** ${member.user.presence.status}`,
				`**❯ Играет:** ${member.user.presence.game || 'Не играет в игру.'}`,
				`\u200b`
			])
			.addField('Member', [
				`**❯ Самая высокая роль:** ${member.roles.highest.id === message.guild.id ? 'Нету.' : member.roles.highest.name}`,
				`**❯ Дата захода на сервер:** ${moment(member.joinedAt).format('LL LTS')}`,
				`**❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'Нету.'}`,
				`**❯ Роли. [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'Нету.'}`,
				`\u200b`
			]);
		return message.channel.send(embed);
	}

};