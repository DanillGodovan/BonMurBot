const Event = require('../../Structures/Event')

module.exports = class extends Event {
    async run(reaction, user) {
        const guildMember = reaction.message.guild.members.cache.get(user.id)
        if (reaction.emoji.name === '📰') {
            guildMember.roles.remove('772774156667584545')
        } else if (reaction.emoji.name === '🎬') {
            guildMember.roles.add('772774116285087765')
        } else if (reaction.emoji.name === '🎉') {
            guildMember.roles.remove('774623878420234250')

        } else if (reaction.emoji.name === '🍰') {
            guildMember.roles.remove('783654975712264222')

        }
    }
}