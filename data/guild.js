const mongoose = require('mongoose')
const config = require("../BotConfig.json")
const schema = mongoose.Schema({
    guildID: String,
    prefix: { type: String, default: config.prefix },
});
module.exports = mongoose.model("Guild", schema)