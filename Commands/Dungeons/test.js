const Command = require('../../Structures/Command');
const { MessageEmbed, MessageAttachment} = require('discord.js');
const Canvas = require('canvas');
module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
            description: "Отсылает информацию для модераторов!",
            usage: "!test",
            category: "Dungeons",
            aliases: ["tst"]
    });
}
async run(message) {
    const a = new MessageEmbed()
    .addField("<:Chest:769039250669699112>")

    message.channel.send(a).then(msg => msg.delete({
        "timeout": 900000
       }));
    }
}
