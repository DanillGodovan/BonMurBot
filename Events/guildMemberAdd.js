const { MessageEmbed } = require('discord.js')
const Event = require('../Structures/Event')

module.exports = class extends Event {
    async run(member) {
        let allmembers = member.guild.members.cache.map(member => member.user.username)
        let oldmembers = allmembers.pop()
        let newmember = member.displayName.toString()
        let channel = member.guild.channels.cache.get('703044539287601156')
        let modchannel = member.guild.channels.cache.get('703290861726859384')
        if (!channel) return console.log('Не найден канал');
        if (!modchannel) return console.log('Не найден канал');
        if (allmembers.some(member => member === newmember) === true) {
            modchannel.send(`Новый пользователь ${member} имеет одинаковое имя! / New Member ${member} has the same name with another member`)
            channel.send(`Member ${member} joined!`)
        } else {
            channel.send(`Member ${member} joined!`)
        }
        let joinembed = new MessageEmbed()
            .setTitle(`Приветствуем на нашем сервере!`)
            .setDescription(`Пожалуйста, прочтите правила и верифицируетесь, и после подтвердите верификацию написав в <#703044539287601156> команду !verify\nPlease read the rules and verify, and then confirm the verification by writing to <#703044539287601156> command !verify!`)
        member.send(joinembed)
    }
}