const Event = require('../../Structures/Event')

const mongoose = require('mongoose')
const User = require('../../data/user')

module.exports = class extends Event {
    async run(reaction, user) {
        const guildMember = reaction.message.guild.members.cache.get(user.id)
        let data = await User.findOne({
            userID: guildMember.id
        })
        if (reaction.emoji.name === '🇷🇺' && reaction.emoji.name === '🇺🇸') {
            guildMember.send("Вы не можете выбрать два флага одновременно!")
            const userReactions = reaction.users.cache.has(user.id)
	        for (reaction of userReactions.values()) {
		        await reaction.users.remove(user.id);
	        }
        }
        if (reaction.emoji.name === '🇷🇺') {
            if (user.bot) return;
            if (!guildMember) return;
            data.lang = "RU"
            data.save()
        } else if (reaction.emoji.name === '🇺🇸') {
            if (user.bot) return;
            if (!guildMember) return;
            data.lang = "US"
            data.save()
        } else if (reaction.emoji.name === '📰') {
            guildMember.roles.add('772774156667584545')

        } else if (reaction.emoji.name === '🎬') {
            guildMember.roles.add('772774116285087765')

        } else if (reaction.emoji.name === '🎉') {
            guildMember.roles.add('774623878420234250')

        } else if (reaction.emoji.name === '🍰') {
            guildMember.roles.add('783654975712264222')

        } else if (reaction.emoji.name === '👌') {
            guildMember.roles.remove('784007913692725278')
            guildMember.roles.add('783786495575457825')

        }
    }
}