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
        .setDescription(`Экономика / Economy`)
        .addField("**Простая Экономика**", "[Команды](https://app.gitbook.com/@biolog-n/s/bro-igrayut-pererozhdenie/komandy)\nДля нахождение команд экономики, перейдите по ссылке выше.\nНастоящая экономика все еще находится в разработке, но для того, чтобы вы не скучали, было решено сделать обычную экономику на UnbelievaBoat.")
        .addField("**Simple Economy**", "[Commands](https://app.gitbook.com/@biolog-n/s/bro-igrayut-pererozhdenie/komandy)\nTo find the economy commands, follow the link above.\nThe real economy is still in development, but in order for you not to get bored, it was decided to make a regular economy on UnbelievaBoat.")
        .addField("**Социальные сети / Social network**", "<:01:774670675947421747> [YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)\n<:03:774670676165918730> [VK](https://www.instagram.com/bro_rbx)\n<:02:774670676581548112> [Instagram](https://vk.com/bro_ytb)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Простая Экономика / Simple Economy.**" ,{embed: embed})
    }
}