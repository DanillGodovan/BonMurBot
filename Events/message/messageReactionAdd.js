const Event = require('../../Structures/Event')

const mongoose = require('mongoose')
const User = require('../../data/user')

module.exports = class extends Event {
    async run(client, reaction, user) {
        let message = reaction.message;

		if (reaction.message.partial) message = await reaction.message.fetch();

        let member = message.guild.members.cache.get(user.id);

        let data = User.findOne({ userID: member.id, guildID: message.guild.id})
		if (!member) member = await message.guild.members.fetch(user.id);
		if (member.id === client.user.id) return;

		if (reaction.partial) await reaction.fetch();

		if ((reaction.emoji.name === '🇷🇺') || (reaction.emoji.toString() === '🇷🇺') || (reaction.emoji.id === '🇷🇺')) {
			const role = message.guild.roles.cache.find((r) => r.name === 'Man');
            member.roles.add(role, 'Reaction role').catch((error) => this.client.logger.error(error));
            data.lang = "RU"
            data.save()
		}
		if ((reaction.emoji.name === '🇺🇸') || (reaction.emoji.toString() === '🇺🇸') || (reaction.emoji.id === '🇺🇸')) {
            data.lang = "US"
            data.save()
        }
    }
}