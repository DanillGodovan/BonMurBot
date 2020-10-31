let Discord = require('discord.js')

module.exports = {
    run: async (message) => {
        let tradechannel = message.guild.channels.cache.find((z) => z.id === "767040008740667412");
        let a = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setDescription(`${context}\n\n**DM <@${message.author.id}>**`)
            .setColor("1AC6FF")
            .setFooter(`${message.guild.name}`, message.guild.iconURL({
                dynamic: true
            }));
        let trade = setInterval(() => tradechannel.send(a), 10000);
    }
}