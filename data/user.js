const mongoose = require('mongoose')
const config = require("../BotConfig.json")
const schema = mongoose.Schema({
    guildID: String,
    userID: String,
    messages: { type: Number, default: 0 },
    locations: { type: Number, default: 0 },
    isFighting: { type: Boolean, default: false },
    location: { type: Number, default: 0 },
    monsterInLocation: { type: Number, default: 0 },
    money: { type: Number, default: 0 },
    health: { type: Number, default: 100 },
    maxHealth: { type: Number, default: 100},
    maxItems: { type: Number, default: 15},
    damage: { type: Number, default: 3 },
    doubleHit: { type: Boolean, default: false},
    monsterHP: { фtype: Number, default: 0 },
    rebirths: { type: Number, default: 0},
    warn: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    bio: { type: String, default: `<prefix>bio [Текст]` },
    tradeText: { type: String, default: `[Текст]` },
    _time: { type: Number, default: 0 }
});
module.exports = mongoose.model("User", schema)