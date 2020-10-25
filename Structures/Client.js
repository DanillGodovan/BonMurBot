const { Client, Collection, Permissions } = require('discord.js');
const Util = require('./Util.js');
module.exports = class BonClient extends Client {

	constructor(options = {}) {
		super({
			disableMentions: 'everyone'
		});
		this.validate(options);

		this.commands = new Collection();

		this.aliases = new Collection();

		this.events = new Collection();

		this.utils = new Util(this);

		this.owners = options.owners;
}

	validate(options) {
		if (typeof options !== 'object') throw new TypeError('Опции должны быть частью объекста.');

		if (!options.token) throw new Error('Ты должен указать токен.');
		this.token = options.token;

		if (!options.prefix) throw new Error('Ты должен указать префикс для клиента.');
		if (typeof options.prefix !== 'string') throw new TypeError('Префикс должен быть строкой.');
		this.prefix = options.prefix;

		if (!options.defaultPerms) throw new Error("Ты должен указать стандартные разрешения(ие) для клиента")
		this.defaultPerms = new Permissions(options.defaultPerms).freeze();
	}

	async start(token = this.token) {
		this.utils.loadCommands();
		this.utils.loadEvents();
		super.login(token);
	}

};