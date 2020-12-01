const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command");
const { prefix } = require('../../BotConfig.json')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["test"],
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
        .setDescription(`Официальные правила сервера / Official server rules.`)
        .addField("**Важное / Обязательное**", "[Правила](https://biolog-n.gitbook.io/bro-igrayut-pererozhdenie/)\nЧтобы пройти верификацию, нажмите на реакцию соответствующею вашему языку.\nНажимая на реакцию Вы соглашаетесь с правилами.\nСсылка на правила находится чуть выше, называется \"Правила\".")
        .addField("**Important & Required**", "[Rules](https://biolog-n.gitbook.io/bro-igrayut-pererozhdenie/english/eng-rules)\nTo pass verification, click on the response corresponding to your language.\nBy clicking on the reaction, you agree to the rules.\nThe link to the rules is located just above, called \"Rules\".")
        .addField("**Социальные сети / Social network**", "<:01:774670675947421747> [YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)\n<:03:774670676165918730> [VK](https://vk.com/bro_ytb)\n<:02:774670676581548112> [Instagram](https://www.instagram.com/bro_rbx)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Важное / The Important**" ,{embed: embed}).then(async msg => {
            await msg.react("🇷🇺")
            await msg.react("🇺🇸")
    })
}
}