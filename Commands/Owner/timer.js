const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command");
const mongoose = require('mongoose')
const User = require('../../data/user')
const Guild = require('../../data/guild');
const User = require("../../data/user");
module.exports = class extends Command {
        constructor(...args) {
            super(...args, {
                aliases: [],
                description: "Timer for King of the day!",
                category: "Owner",
                ownerOnly: true,
            });
        }

        async run(message) {
            message.delete()
            let data = await User.updateMany({
                "messagePerDay": {
                    $gt: 0
                }
            }, {
                "messagePerDay": 0
            });
            let guildData = await Guild.find({
                guildID: message.guild.id
            })
            let userData = User.findOne({
                guildID: message.guild.id
            }).sort([
                ['messagePerDay', 'descending']
            ])
            console.log(guildData)
            guildData.timerActive = true;
            setTimeout(() => { if (userData.length === 0) {
                        message.channel.send('К сожалению никто не стал топом сервера.')
                    } else {
                            let name = this.client.users.cache.get(userData[0].userID).tag || "Неизвестно"
                            message.channel.send(`Сегодня топ дня занял ${name}`)
                    }
                        }, 20000)

                message.channel.send("**Таймер активирован / Timer has been activated**")
                guildData.save()
            }
        }