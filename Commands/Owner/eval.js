const { MessageAttachment } = require("discord.js");
const Command = require("../../Structures/Command");
const { inspect } = require("util");
const { Type } = require("@extreme_hero/deeptype");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["ev"],
      description: "Показывает информацию о боте.",
      category: "Owner",
      ownerOnly: true,
    });
  }

  async run(message, args) {
    const msg = message; // !eval msg.guild
    if (!args.length)
      return msg.channel.send("Мне нужен код, что эваулировать.");
    let code = args.join(" ");
    code = code.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
    let evaled;
    try {
      const start = process.hrtime();
      evaled = eval(code);
      if (evaled instanceof Promise) {
        evaled = await evaled;
      }
      const stop = process.hrtime(start);
      const response = [
        `**Output:** \`\`\`js\n${this.clean(
          inspect(evaled, { depth: 0 })
        )}\n\`\`\``,
        `**Type:** \`\`\`ts\n${new Type(evaled).is}\n\`\`\``,
        `**Time Taken:** \`\`\`${(stop[0] * 1e9 + stop[1]) / 1e6}ms\`\`\``,
      ];
      const res = response.join("\n");
      if (res.length < 2000) {
        await msg.channel.send(res);
      } else {
        const output = new MessageAttachment(Buffer.from(res), "output.txt");
        await msg.channel.send(output);
      }
    } catch (err) {
      return message.channel.send(`Error:\`\`\`xl\n${this.clean(err)}\n\`\`\``);
    }
  }

  clean(text) {
    if (typeof text === "string") {
      text = text
        .replace(/`/g, `\`${String.fromCharCode(8203)}`)
        .replace(/@/g, `@${String.fromCharCode(8203)}`)
        .replace(new RegExp(this.client.token, "gi"), "****");
    }
    return text;
  }
};
