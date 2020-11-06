
const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command");
const { prefix } = require('../../BotConfig.json')
module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['halp'],
			description: 'Показывает все команды у бота',
			category: 'Утилиты',
			usage: '[command]',
            guildOnly: false,
			nsfw: false,
			args: false
		});
	}

	async run(message) {
        message.delete()
		const embed = new MessageEmbed()
        .setTitle(`**Server: ${message.guild.name}**`)
        .setColor('34B7EB')
        .setDescription(`BMB Commands starts with \`!\``)
        .addField("**Основное & Важное**", "[Правила](https://app.gitbook.com/@biolog-n/s/bro-igrayut-pererozhdenie/)\n[Основная Информация](https://app.gitbook.com/@biolog-n/s/bro-igrayut-pererozhdenie/osnovnaya-informaciya)\n[Команды](https://app.gitbook.com/@biolog-n/s/bro-igrayut-pererozhdenie/komandy)\n[Трейды](https://app.gitbook.com/@biolog-n/s/bro-igrayut-pererozhdenie/treidy)")
        .addField("**Basic & Important**", "[Rules](https://app.gitbook.com/@biolog-n/s/bro-igrayut-pererozhdenie/)\n[Basic Information](https://app.gitbook.com/@biolog-n/s/bro-igrayut-pererozhdenie/osnovnaya-informaciya)\n[Commands](https://app.gitbook.com/@biolog-n/s/bro-igrayut-pererozhdenie/komandy)\n[Trades](https://app.gitbook.com/@biolog-n/s/bro-igrayut-pererozhdenie/treidy)")
        .addField("**YouTube Channel / Ютуб Канал**", "[Youtube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)")
        .setFooter(`Запрошено ${message.author.username} | BonMurBot ©️ 2020-2020 Все Права Съедены.`, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
}
}