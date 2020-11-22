const Event = require('../../Structures/Event')
const BonEmbed = require('../../Structures/BonEmbed')

module.exports = class extends Event {
    async run(message) {
        if(!message.guild || message.author.bot) return;
        const attachments = message.attachments.size ? message.attachments.map(attachment => attachment.proxyURL) : null;
        const embed = new BonEmbed()
        .setColor('RED')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle('Сообщение удалено')
        .setDescription([
            `**❯ ID Сообщения:** ${message.id}`,
            `**❯ Канал:** ${message.channel}`,
            `${attachments ? `**❯ Вложения:** ${attachments.join('\n')}` : ''}`
        ])
        if(message.content.length) {
            embed.splitFields(`**❯ Удаленое сообщение:** ${message.content}`)
        }

        const channel = message.guild.channels.cache.find(ch => ch.name === 'основные-логи')
        if (channel) channel.send(embed)
    }
}