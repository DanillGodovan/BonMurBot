const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["role-setup"],
            description: "setup.",
            category: "Owner",
            ownerOnly: true,
		});
	}

	async run(message) {
		const embed = new MessageEmbed()
		.setTitle("**Правила**")
		.setDescription("**Чтобы открыть чат-комнаты**, перейдите по ссылке ниже, ознакомьтесь с правилами, подтвердите прочтение, выберите флаг, определяющий ваш язык, и напишите в этом чате команду !verify.\n:flag_ru: **RU** https://clck.ru/RdBSC")

		message.channel.send("**Верификация 1/2**", { embed: embed }).then(async msg => {
			await msg.react("🇷🇺")
		})
	}
}