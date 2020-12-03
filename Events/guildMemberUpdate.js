const Event = require('../Structures/Event')
let { trade } = require('../Commands/Трейд команды/trade')

module.exports = class extends Event {
    async run(oldMember, newMember) {
        if (newMember.roles.cache.has('770825639837958155') && newMember.roles.cache.has('770436611539468298')) {
            newMember.roles.add('783611850901422080')
        } else if (newMember.roles.cache.has('770825639837958155') && newMember.roles.cache.has('770436608754581515')) {
            newMember.roles.add('783611958544171038')
        }

        if (newMember.roles.cache.has('783327195330379786')) {
            newMember.roles.add('784007913692725278')
        }
        
        if (oldMember.roles.cache.has('741074618177159189') !== newMember.roles.cache.has('741074618177159189')) {
            newMember.roles.remove('776934943438929981')
        }
    }
}