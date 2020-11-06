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
        .addField("**Русская Версия**", "[Команды](https://app.gitbook.com/@biolog-n/s/bro-igrayut-pererozhdenie/komandy)\nДля нахождение команд экономики, перейдите по ссылке выше.\nНастоящая экономика все еще находится в разработке, но для того, чтобы вы не скучали, было решено сделать обычную экономику на UnbelievaBoat.")
        .addField("**English Version**", "[Commands](https://app.gitbook.com/@biolog-n/s/bro-igrayut-pererozhdenie/komandy)\nTo find the economy commands, follow the link above.\nThe real economy is still in development, but in order for you not to get bored, it was decided to make a regular economy on UnbelievaBoat.")
        .addField("**<:YouTube:770834157244776458> YouTube Channel / Ютуб Канал**", "[YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Экономика / Economy**" ,{embed: embed})
    }
}