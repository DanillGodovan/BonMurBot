const Event = require('../../Structures/Event')

const mongoose = require('mongoose')
const User = require('../../data/user')

module.exports = class extends Event {
    async run(reaction, user) {
        const guildMember = reaction.message.guild.members.cache.get(user.id)
        let data = await User.findOne({ userID: guildMember.id })
        if(reaction.emoji.name === '🇷🇺') {
            if (user.bot) return;
            if (!guildMember) return;
            data.lang = "RU"
            data.save()
        } else if (reaction.emoji.name === '🇺🇸') {
            if (user.bot) return;
            if (!guildMember) return;
            data.lang = "US"
            data.save()
        }
    }
}