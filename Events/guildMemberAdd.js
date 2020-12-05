const { MessageEmbed } = require('discord.js')
const Event = require('../Structures/Event')

module.exports = class extends Event {
    async run(member) {
        let allmembers = member.guild.members.cache.map(member => member.user.username)
        let oldmembers = allmembers.pop()
        let newmember = member.displayName.toString()

        let modchannel = member.guild.channels.cache.get('703290861726859384')
        if (!modchannel) return console.log('Не найден канал');
        if (allmembers.some(member => member === newmember) === true) {
            modchannel.send(`Новый пользователь ${member} имеет одинаковое имя! / New Member ${member} has the same name with another member`)
        }
    }
}