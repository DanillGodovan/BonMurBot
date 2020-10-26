const mongoose = require('mongoose')
const config = require("../BotConfig.json")
const schema = mongoose.Schema({
    guildID: String,
    userID: String,
    messages: { type: Number, default: 0 },
    locations: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },
    warn: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    tradeText: { type: String, default: `[Текст]` },
    _time: { type: Number, default: 0 }
});
module.exports = mongoose.model("User", schema)