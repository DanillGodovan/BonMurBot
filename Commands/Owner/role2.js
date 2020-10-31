const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["role-setup2"],
            description: "setup.",
            category: "Owner",
            ownerOnly: true,
		});
	}

	async run(message) {
		const embed = new MessageEmbed()
		.setTitle("**Rules**")
        .setDescription("**To open chat rooms**, ollow the link below, read the rules, confirm reading, select the flag that defines your language, and write the command in this chat !verify.\n:flag_us: **ENG** https://clck.ru/RdBRK")
        
        message.channel.send("**Verification 1/2**", { embed: embed }).then(async msg => {
        await msg.react("🇺🇸")
    })
	}
}