const Client = require('./Structures/Client');
const config = require('./BotConfig.json');
const client = new Client(config);

const User = require('./data/user')
const Guild = require('./data/guild')
const mongoose = require('mongoose')

    mongoose.connect(config.dataURL, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('connected',() => {
      console.log('[✅DataBase] Connected!')
  })

 client.on('message', async(message) => {
    if(message.author.bot) return;
    if(message.channel.type == 'dm') return;
      User.findOne({guildID: message.guild.id, userID: message.author.id}, (err,res) => {
      if(err) return console.log(`\`[❌DataBase]\` Произошла ошибка при добавлении пользователя в базу-данных`)
      if(!res){
        let user = new User({guildID: message.guild.id, userID: message.author.id})
        console.log(`\`[✅DataBase]\` **${message.author.username}** Успешно был(а) добавлен в базу-данных`)
        user.save().catch(err => message.channel.send(`\`[❌DataBase]\` Произошла ошибка при сохранении данных в базу-данных. Ошибка: \`\`\`${err}\`\`\``));
      } else {
        let random = Math.floor(Math.random() * 5)
        res.messages++
  
        res.save()
        }
      })
    Guild.findOne({guildID: message.guild.id}, (err,res) => {
      if(err) return console.log(`[❌DataBase] Произошла ошибка при добавлении сервера в базу-данных`)
      if(!res){
        let guild = new Guild({guildID: message.guild.id})
        console.log(`\`[✅DataBase]\` **${message.guild.name}** Успешно была добавлена в базу-данных`)
        guild.save().catch(err => console.log(`\`[❌DataBase]\` Произошла ошибка при сохранении сервера в базу-данных. Ошибка: \`\`\`${err}\`\`\``));
        command.execute(bot, message, args);
      }
    })
  })
client.start();