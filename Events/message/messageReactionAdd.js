const Event = require('../../Structures/Event')

const mongoose = require('mongoose')
const User = require('../../data/user')

module.exports = class extends Event {
    async run(reaction, user) {
        const guildMember = reaction.message.guild.members.cache.get(user.id)
        let data = await User.findOne({
            userID: guildMember.id
        })
        if (reaction.emoji.name === '🇷🇺') {
            if (user.bot) return;
            if (!guildMember) return;
            guildMember.roles.add('748584003002695751')
            guildMember.roles.add('770436611539468298')
            data.lang = "RU"
            data.save()
        } else if (reaction.emoji.name === '🇺🇸') {
            if (user.bot) return;
            if (!guildMember) return;
            guildMember.roles.add('748584003002695751')
            guildMember.roles.add('770436608754581515')
            data.lang = "US"
            data.save()
        } else if (reaction.emoji.name === '📰') {
            guildMember.roles.add('772774156667584545')

        } else if (reaction.emoji.name === '🎬') {
            guildMember.roles.add('772774116285087765')

        } else if (reaction.emoji.name === '🎉') {
            guildMember.roles.add('774623878420234250')

        }
    }
}