const Client = require('./Structures/Client');
const config = require('./BotConfig.json');
const client = new Client(config);

const mongoose = require('mongoose')

    mongoose.connect(config.dataURL, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('connected',() => {
      console.log('[✅DataBase] Connected!')
  })
  
client.start();