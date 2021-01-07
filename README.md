# BonMurBot
[![Uptime Robot status](https://img.shields.io/uptimerobot/status/m780010966-3242e97a2ffbe3e33ef10eb4.svg)](https://stats.bonmurbot.ga)
[![Uptime Robot ratio](https://img.shields.io/uptimerobot/ratio/m780010966-3242e97a2ffbe3e33ef10eb4.svg)](https://stats.bonmurbot.ga)
[![GPL Licence](https://badges.frapsoft.com/os/gpl/gpl.svg?v=103)](LICENSE)
[![github](https://img.shields.io/github/release/DanillGodovan/BonMurBot.svg?color=brightgreen)](https://github.com/DanillGodovan/BonMurBot/releases)

## What is BonMurBot?
**BonMurBot** - a multifunctional bot for the **Discord** platform with many useful and only the most necessary features. In the near future it is planned to remake the bot for many servers.

## Bot Features

⚙ General functionality: Support for English, Russian and the ability to auto-change the bot language for the selected roles.

💻 Special auditing system.

✌ Greeting: Customize your own greeting messages for new members, assign them starting roles, and return previous ones to old members.

🎭 Fun: Implement commands talking about who's in love with you, creating QR codes, searching the PlayStore, and more.

🏆 Member Rating: Reward your members for being active on the server by giving out roles when they reach certain levels!

☢ Mutant Roles: Combine roles using philosophical stone shards to create better roles.

🎰 Roulette: Once you reach a certain level, you can use roulette with roles, eternal bonuses to experience and others! However, once used, your level is completely cancelled.

🤝 BGS Trading: Our bot has the most convenient trading system, which means it will automatically resend your entered trade offer every 15 minutes!

🦁 Commands: Customize your commands to your liking!

## Built with

[Discord.js](https://discord.js.org/#/) - Library with which the bot was developed.

[Mongoose](https://mongoosejs.com) - The framework we use with mongoDB

[Express.js](expressjs.com) - The web framework which built our site

## Installing
Installing packages:
```
$ npm i

or

$ yarn add
```

Create your MongoDB account and create your DB.

Create BotConfig.json :
```
{
    "dataURL": "MongoDB URL",
    "token": "Your Token",
    "prefix": "!",
    "owners": ["Your Discord ID"],
    "warn": "7",
    "points": "100",
    "defaultPerms": ["SEND_MESSAGES", "VIEW_CHANNEL"]
}
```

## Contributing

Please read [CONTRIBUTING.md](Contributing.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Daniil Godovan** - *Programming* - [DanillGodovan](https://github.com/DanillGodovan)

See also the list of [contributors](https://github.com/DanillGodovan/BonMurBot/contributors) who participated in this project.

## License

BonMurBot is licensed under the GNU General Public License v3.0.
> Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.
