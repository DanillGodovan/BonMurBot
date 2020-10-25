const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const User = require('../../data/user.js');
const mongoose = require('mongoose')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['modinfo'],
			description: 'Показывает всю информацию о модераторе или о указанном модераторе.',
			category: 'Информация',
			usage: '[user]',
            guildOnly: true,
			nsfw: false,
		});
	}

	async run(message, [target]) {
		const member = message.mentions.members.last() || message.guild.members.cache.get(target) || message.member;
        User.findOne({guildID: message.guild.id, userID: member.id}, (err,data) => {
		const embed = new MessageEmbed()
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor('2F3136')
			.addField('User', [
				`**❯ Никнейм:** ${member.user.tag}`,
				`**❯ ID:** ${member.id}`,
                `**❯ Аватар:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
                `**❯ Очки:** ${data.points}`,
                `**❯ Преды:** ${data.warn}`,
				`**❯ Создан:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
			])
        return message.channel.send(embed);
    })
	}

};