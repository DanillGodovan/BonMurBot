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
        .addField("**Сливы / Leaks**", ":warning: Правила сливов просты. Запрещено выводить любую информацию о сливах за предела чата, который появится после подтверждения правил.\nЗа нарушение данного правила Вам выдадут Бан навсегда.\nДля согласия с данным правилом, нажмите на 👌 чуть ниже.\n:warning: The rules for leaks are simple. It is forbidden to display any information about leaks outside the chat, which will appear after confirming the rules.\nIf You violate this rule, You will be Banned forever.\nTo agree to this rule, click on 👌 just below.")
        .addField("**Социальные сети / Social network**", "<:01:774670675947421747> [YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)\n<:03:774670676165918730> [VK](https://vk.com/bro_ytb)\n<:02:774670676581548112> [Instagram](https://www.instagram.com/bro_rbx)")
        .setFooter(`Не нужны сливы - нажмите на реакцию у данного сообщения / Don't need leaks - click on the reaction in this message`)
        message.channel.send("**Важное / The Important**" ,{embed: embed}).then(msg => {
            msg.react('👌')
        })
}
}