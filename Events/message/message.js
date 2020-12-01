const Event = require('../../Structures/Event');
const User = require('../../data/user')
const Guild = require('../../data/guild')

module.exports = class extends Event {

    async run(message) {
        const mentionRegex = RegExp(`^<@!${this.client.user.id}>$`);
        const mentionRegexPrefix = RegExp(`^<@!${this.client.user.id}> `);
        const swearRegex2 = RegExp(`(\s+|^)[пПnрРp]?[3ЗзВBвПnпрРpPАaAаОoO0о]?[сСcCиИuUОoO0оАaAаыЫуУyтТT]?[Ппn][иИuUeEеЕ][зЗ3][ДдDd]\w*[\?\,\.\;\-]*|(\s+|^)[рРpPпПn]?[рРpPоОoO0аАaAзЗ3]?[оОoO0иИuUаАaAcCсСзЗ3тТTуУy]?[XxХх][уУy][йЙеЕeEeяЯ9юЮ]\w*[\?\,\.\;\-]*|(\s+|^)[бпПnБ6][лЛ][яЯ9]([дтДТDT]\w*)?[\?\,\.\;\-]*|(\s+|^)(([зЗоОoO03]?[аАaAтТT]?[ъЪ]?)|(\w+[оОOo0еЕeE]))?[еЕeEиИuUёЁ][бБ6пП]([аАaAиИuUуУy]\w*)?[\?\,\.\;\-]*`)

        if (message.author.bot) return;

        if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is \`${this.client.prefix}\`.`);

        if (message.content.match(swearRegex2)) {
            message.delete()
            message.channel.send(`Предупреждение о мате / Swear warning!`).then(msg => msg.delete( {timeout: 10000 } ))
        }
        User.findOne({
            guildID: message.guild.id,
            userID: message.author.id
        }, (err, res) => {
            if (err) return console.log(`\`[❌DataBase]\` Произошла ошибка при добавлении пользователя в базу-данных`)
            if (!res) {
                let user = new User({
                    guildID: message.guild.id,
                    userID: message.author.id
                })
                console.log(`\`[✅DataBase]\` **${message.author.username}** Успешно был(а) добавлен в базу-данных`)
                user.save().catch(err => message.channel.send(`\`[❌DataBase]\` Произошла ошибка при сохранении данных в базу-данных. Ошибка: \`\`\`${err}\`\`\``));
            } else {
                res.messages++
                res.save()
            }
        })
        Guild.findOne({
            guildID: message.guild.id
        }, (err, res) => {
            if (err) return console.log(`[❌DataBase] Произошла ошибка при добавлении сервера в базу-данных`)
            if (!res) {
                let guild = new Guild({
                    guildID: message.guild.id
                })
                console.log(`\`[✅DataBase]\` **${message.guild.name}** Успешно была добавлена в базу-данных`)
                guild.save().catch(err => console.log(`\`[❌DataBase]\` Произошла ошибка при сохранении сервера в базу-данных. Ошибка: \`\`\`${err}\`\`\``));
                if (guild.timerActive === true) {
                    User.findOne({
                        guildID: message.guild.id,
                        userID: message.author.id
                    }, (err, res) => {
                        res.messagePerDay++
                        res.save()
                    })
                }
            }
        })

        const prefix = message.content.match(mentionRegexPrefix) ?
            message.content.match(mentionRegexPrefix)[0] : this.client.prefix;

            const allprefixes = ["!", "pls", "*", ";;", "/", ".", "?"]
        if(message.channel.id === '703254582834364458' || message.channel.id === '703267200290652250' || message.channel.id === '703280456732377089') {
            const filter = allprefixes.some(prefix => message.content.startsWith(prefix))
            if (filter === false) message.delete()
        }

        if(message.channel.id === '703267200290652250') {
            if (!message.content.startsWith("!verify")) message.delete()
        }

        if (!message.content.startsWith(prefix)) return;


        const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

        const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
        if (command) {
            if (command.ownerOnly && !this.client.utils.checkOwner(message.author.id)) {
                return message.reply("Это команда только для владельца бота.")
            }

            if (command.guildOnly && !message.guild) {
                return message.reply("Это команда доступна только на дискорд сервере.")
            }

            if (command.nsfw && !message.channel.nsfw) {
                return message.reply("Это команда используеться только в NSFW каналах.")
            }

            if (command.args && args.length) {
                return message.reply(`Это команда требует аргументов в функции, использовние: ${command.usage ?
				command.usage : "Эта команда не использует формат использования."}.`)
            }
            if (message.guld) {
                const userPermCheck = command.userPerms ? this.client.defaultPerms.add(command.userPerms) : this.client.defaultPerms;
                if (userPermCheck) {
                    const missing = message.channel.permissionsFor(message.member).missing(userPermCheck)
                    if (missing.length) {
                        return message.reply(`У вас не хватает ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} прав доступа, вам они нужны для использования команды.`)
                    }
                }
                const botPermCheck = command.userPerms ? this.client.defaultPerms.add(command.userPerms) : this.client.defaultPerms;
                if (botPermCheck) {
                    const missing = message.channel.permissionsFor(message.member).missing(botPermCheck)
                    if (missing.length) {
                        return message.reply(`У вас не хватает ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} прав доступа, вам они нужны для использования команды.`)
                    }
                }
            }

            command.run(message, args);
        }
    }

};