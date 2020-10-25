const { Permissions } = require("discord.js");

module.exports = class Command {

	constructor(client, name, options = {}) {
		this.client = client;
		this.name = options.name || name;
		this.aliases = options.aliases || [];
		this.description = options.description || 'Нету описания..';
		this.category = options.category || 'Для всех.';
		this.usage = options.usage || 'Использование не указано.';
		this.userPerms = new Permissions(options.userPerms).freeze();
		this.botPerms = new Permissions(options.botPerms).freeze();
		this.guildOnly = options.guildOnly || false
		this.ownerOnly = options.ownerOnly || false
		this.nsfw = options.nsfw || false
		this.args = options.args || false
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, args) {
		throw new Error(`Команда ${this.name} не указала метод использования!`);
	}

};