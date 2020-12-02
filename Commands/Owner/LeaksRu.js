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
        .setDescription(`Сливы / Leaks`)
        .addField("**Сливы / Leaks**", "Если Вы не хотите больше никогда видеть сливы, то нажмите на 👆 у данного сообщения.\nIf You don't want to see any more plums, click on 👆 for this message.")
        .addField("**Социальные сети / Social network**", "<:01:774670675947421747> [YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)\n<:03:774670676165918730> [VK](https://vk.com/bro_ytb)\n<:02:774670676581548112> [Instagram](https://www.instagram.com/bro_rbx)")
        .setFooter(`Не нужны сливы - нажмите на реакцию у данного сообщения / Don't need leaks - click on the reaction in this message`)
        message.channel.send("**Важное / The Important**" ,{embed: embed}).then(msg => {
            msg.react('👆')
        })
}
}