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
    const canvas = Canvas.createCanvas(6500, 1150);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage('./Commands/Dungeons/dlya_bonki1.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.font = '325px Helvetica Bold';

    ctx.fillStyle = '#ffffff';
    
    ctx.fillText("Slime", canvas.width / 5.4, canvas.height / 2.1);

	ctx.beginPath();
	ctx.arc(450, 250, 75, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();
	const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

    message.channel.send(attachment).then(msg => msg.delete({
        "timeout": 900000
       }));
    }
}
