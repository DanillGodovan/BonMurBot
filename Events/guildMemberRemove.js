const Event = require('../Structures/Event')
let { trade } = require('../Commands/Трейд команды/trade')

module.exports = class extends Event {
    async run(member) {
        clearInterval(trade)
    }
}