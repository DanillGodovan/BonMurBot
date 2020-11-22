const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command");
const { prefix } = require('../../BotConfig.json')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: [],
            description: "test.",
            category: "Owner",
            ownerOnly: true,
		});
	}

	async run(message) {
        message.delete()
		const embed = new MessageEmbed()
        .setTitle(`**Server: ${message.guild.name}**`)
        .setColor('34B7EB')
        .setDescription(`Выбитые Секретки / Hatched Secrets`)
        .addField("**Выбитые Секретки**", "Сюда публикуются секретки, выбитые игроками всего BGS в Roblox.\nЕсли Вы выбили секретку и увидели ее здесь — Вы молодец.")
        .addField("**Hatched Secrets**", "Here are published secrets, hatched by players of all BGS in Roblox.\nIf You knocked out a secret and saw it here — You are well done.")
        .addField("**Социальные сети / Social network**", "<:01:774670675947421747> [YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)\n<:03:774670676165918730> [VK](https://www.instagram.com/bro_rbx)\n<:02:774670676581548112> [Instagram](https://vk.com/bro_ytb)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Основное / Main**" ,{embed: embed})
    }
}