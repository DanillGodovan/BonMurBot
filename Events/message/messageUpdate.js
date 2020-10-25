const Event = require('../../Structures/Event')
const BonEmbed = require('../../Structures/BonEmbed')
const { Util: {escapeMarkdown} } = require('discord.js')
const { diffWordsWithSpace } = require('diff') 

module.exports = class extends Event {
    async run(old, message) {
        if(!message.guild || old.content === message.content || message.author.bot) return;

        const embed = new BonEmbed()
        .setColor('RED')
        .setAuthor(old.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle('Сообщение изменено')
        .setDescription([
            `**❯ ID Сообщения:** ${old.id}`,
            `**❯ Канал:** ${message.channel}`,
            `**❯ Автор:** ${old.author.tag} (${old.author.id})`,
        ])
        .setURL(old.url)
        .splitFields(diffWordsWithSpace(escapeMarkdown(old.content), escapeMarkdown(message.content))
        .map(result => result.added ? `**${result.value}**` : result.removed ? `~~${result.value}~~` : result.value)
        .join(' '));

        const channel = message.guild.channels.cache.find(ch => ch.name === 'основные-логи')
        if (channel) channel.send(embed)
    }
}