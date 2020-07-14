require('dotenv').config()
const botconfig = require("./config.json");
const wishes = require("./wishes.json");
const Discord = require("discord.js");
const prefix = botconfig.prefix;
const fs = require("fs");
const Sequelize = require('sequelize');
const bot = new Discord.Client({ disableEveryone: true });

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.config = {
TOKEN: process.env.BOT_TOKEN
};
const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Tags = sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	description: Sequelize.TEXT,
	username: Sequelize.STRING,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});
exports.suggest = () => {
    return Tags;
}

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name);
    });
  });
});

bot.on("guildMemberAdd", member => {
  
  const channel = member.guild.channels.cache.find(ch => ch.name === "welcome");
  if (!channel) return;
  let { guild } = member;
  const WelcomeGreetings = wishes.welcome;
  const RandomGreetings = Math.floor(Math.random() * wishes.welcome.length + 1);
  const GetWelcomeGreetings = WelcomeGreetings[RandomGreetings];
  let wel = new Discord.MessageEmbed()
    .setColor(botconfig.primary)
    .setAuthor(GetWelcomeGreetings, botconfig.party)
    .setThumbnail(member.user.displayAvatarURL())
    .setDescription(
      `**${member.user.tag.toUpperCase()} HAS JUST JOINED OUR SERVER!**`
    );
try{
  channel.send(wel);
}catch(err){console.log(err);} 
});

bot.on("ready", async () => {
  Tags.sync();
  console.log(`${bot.user.username} working`);
 const activities_list = [
    `${prefix}commands`,
    "http://gg.gg/fortrex",
    `${prefix}help`,
    "VALORANT",
    "Animal Crossing"
];
    setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); 
    bot.user.setActivity(activities_list[index]); 
  }, 100000);

  bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let commandfile;

    if (bot.commands.has(cmd)) {
      commandfile = bot.commands.get(cmd);
    } else if (bot.aliases.has(cmd)) {
      commandfile = bot.commands.get(bot.aliases.get(cmd));
    }

    if (!message.content.startsWith(prefix)) return;

    try {
      commandfile.run(bot, message, args);
    } catch (e) {}
  });
});
bot.on("message", message => {
  
  //Random Morning Messages
  const Mornings = wishes.gm;
  const RandomMorning = Math.floor(Math.random() * wishes.gm.length + 1);
  const GetMorning = Mornings[RandomMorning];

  if (message.content.startsWith("Gm")) {
    message.channel.send(GetMorning);
  }
  if (message.content.startsWith("gm")) {
    message.channel.send(GetMorning);
  }
  if (message.content.startsWith("good morning")) {
    message.channel.send(GetMorning);
  }
  if (message.content.startsWith("Good Morning")) {
    message.channel.send(GetMorning);
  }

  //Random Good Night Wishes
  const NightWishes = wishes.gn;
  const countNight = wishes.gn.length;
  const RandomNight = Math.floor((Math.random() * countNight) + 1);
  const GetNightWishes = NightWishes[RandomNight];
  if (message.content.startsWith("GN")) {
    message.channel.send(GetNightWishes);
  }
  if (message.content.startsWith("Gn")) {
    message.channel.send(GetNightWishes);
  }
  if (message.content.startsWith("Good Night")) {
    message.channel.send(GetNightWishes);
  }
  if (message.content.startsWith("good night")) {
    message.channel.send(GetNightWishes);
  }
  if (message.content.startsWith("gn")) {
    message.channel.send(GetNightWishes);
  }
});
bot.login(process.env.BOT_TOKKEN);
