const Event = require('../Structures/Event');
const mongoose = require('mongoose')
const User = require('../data/user')
const Guild = require('../data/guild');
module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}

	async run() {
		let data = await User.updateMany({ tradeSent: true }, { tradeSent: false });
		let guildData = await Guild.updateMany({ timerActive: true}, { timerActive: false })
		console.log([
			`Logged in as ${this.client.user.tag}`,
			`Loaded ${this.client.commands.size} commands!`,
			`Loaded ${this.client.events.size} events!`
        ].join('\n'));
        
        const activities = [
            `${this.client.guilds.cache.size} servers!`,
            `${this.client.channels.cache.size} channels!`,
            `${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users!`
        ]

        let i = 0;
        setInterval(() => this.client.user.setActivity(`${this.client.prefix}help | ${activities[i++ % activities.length]}`, {type: 'WATCHING'}), 15000)
	}

};