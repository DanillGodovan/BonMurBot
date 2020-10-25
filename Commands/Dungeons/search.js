const Command = require('../../Structures/Command');
const { MessageEmbed, MessageAttachment, User} = require('discord.js');
const moment = require('moment');
const usedCommand = new Set();
const Canvas = require('canvas');
module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
            description: "Ищет монстров!",
            usage: "!search",
            category: "Dungeons",
            aliases: ["Искать"],
            guildOnly: true,
		      	nsfw: false,
		      	args: true
    });
}
async run(message, args) {
    const canvas = Canvas.createCanvas(8000, 1450);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage('./Commands/Dungeons/dlya_bonki1.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.font = '378px Segoe UI Black';

    ctx.fillStyle = '#ffffff';
    
    ctx.fillText("Информация / !economy здесь", canvas.width / 5.5, canvas.height / 1.7);

	ctx.beginPath();
	ctx.arc(725, 725, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();
	const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
    var locations = ['forest', 'hills', 'dungeon', 'lower world', 'paradise', 'valley of dreams', 'shard of the universe', 'new world', 'mystical Forest', 'caves', 'volcano', 'endless world']
    User.findOne({guildID: message.guild.id, userID: message.author.id}, (err,data) => {
      if(message.content.includes(locations[8].toLowerCase)) {
        message.channel.send("Начинаю поиск в мистическом лесу, подождите 15 минут...")
        setTimeout(() => {
          message.reply("**Monster found! / Монстер найден!**")
          data.isFighting = true
          data.location = 9
          data.monsterInLocation = 1
      }, 900000)
      } else if(message.content.includes(locations[1].toLowerCase)) {
        message.channel.send("Начинаю поиск в горах, подождите 15 минут...")
        setTimeout(() => {
          message.reply("**Monster found! / Монстер найден!**")
          data.isFighting = true
          data.location = 2
          data.monsterInLocation = 1
      }, 900000)
      } else if(message.content.includes(locations[2].toLowerCase)) {
        message.channel.send("Начинаю поиск в подземелье, подождите 15 минут...")
        setTimeout(() => {
          message.reply("**Monster found! / Монстер найден!**")
          data.isFighting = true
          data.location = 3
          data.monsterInLocation = 1
      }, 900000)
      } else if(message.content.includes(locations[3].toLowerCase)) {
        message.channel.send("Начинаю поиск в нижнем мире, подождите 15 минут...")
        setTimeout(() => {
          message.reply("**Monster found! / Монстер найден!**")
          data.isFighting = true
          data.location = 4
          data.monsterInLocation = 1
      }, 900000)
      } else if(message.content.includes(locations[4].toLowerCase)) {
        message.channel.send("Начинаю поиск в раю, подождите 15 минут...")
        setTimeout(() => {
          message.reply("**Monster found! / Монстер найден!**")
          data.isFighting = true
          data.location = 5
          data.monsterInLocation = 1
      }, 900000)
      } else if(message.content.includes(locations[5].toLowerCase)) {
        message.channel.send("Начинаю поиск в долине мечт, подождите 15 минут...")
        setTimeout(() => {
          message.reply("**Monster found! / Монстер найден!**")
          data.isFighting = true
          data.location = 6
          data.monsterInLocation = 1
      }, 900000)
      } else if(message.content.includes(locations[6].toLowerCase)) {
        message.channel.send("Начинаю поиск на осколке вселенной, подождите 15 минут...")
        setTimeout(() => {
          message.reply("**Monster found! / Монстер найден!**")
          data.isFighting = true
          data.location = 7
          data.monsterInLocation = 1
      }, 900000)
      } else if(message.content.includes(locations[7].toLowerCase)) {
        message.channel.send("Начинаю поиск в новом мире, подождите 15 минут...")
        setTimeout(() => {
          message.reply("**Monster found! / Монстер найден!**")
          data.isFighting = true
          data.location = 8
          data.monsterInLocation = 1
      }, 900000)
      } else if(message.content.includes(locations[0].toLowerCase)) {
        message.channel.send("Начинаю поиск в лесу, подождите 15 минут...")
        setTimeout(() => {
          message.reply("**Monster found! / Монстер найден!**")
          data.isFighting = true
          data.location = 1
          data.monsterInLocation = 1
      }, 900000)
      } else if(message.content.includes(locations[9].toLowerCase)) {
        message.channel.send("Начинаю поиск в шахтах, подождите 15 минут...")
        setTimeout(() => {
          message.reply("**Monster found! / Монстер найден!**")
          data.isFighting = true
          data.location = 10
          data.monsterInLocation = 1
      }, 900000)
      } else if(message.content.includes(locations[10].toLowerCase)) {
        message.channel.send("Начинаю поиск в вулкане, подождите 15 минут...")
        setTimeout(() => {
          message.reply("**Monster found! / Монстер найден!**")
          data.isFighting = true
          data.location = 11
          data.monsterInLocation = 1
      }, 900000)
      } else if(message.content.includes(locations[11].toLowerCase)) {
        message.channel.send("Начинаю поиск в бесконечном мире, подождите 15 минут...")
        setTimeout(() => {
          message.reply("**Monster found! / Монстер найден!**")
          data.isFighting = true
          data.location = 12
          data.monsterInLocation = 1
      }, 900000)
      } else {
        message.reply("Вы не указали место, куда отправится!")
      }
    })
}
}