const Discord = require("discord.js");
const main = require("./../server.js");
const botconfig = require("./../config.json");
const Sequelize = require("sequelize");
const prefix = botconfig.prefix;
// let prefix = config.prefix;
const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

module.exports.run = async (bot, message, args) => {
  if (!message.content.startsWith(prefix)) return;
  let cmd = prefix + module.exports.help.name;
  let msg = message.content.slice(cmd.length);
  if(msg == ''){
    let Tread = new Discord.MessageEmbed()
    .setColor('GREEN')
    .addField(`Commands`, '\n`tread add [tread_name] [tread_description]`\n\n`tread view [tread_name]`\n\n`tread edit [tread_name]`\n\n`tread treads`', true)
    .addField(`Descriptions`, '\nTo create a tread\n\nTo view a tread\n\n To edit a tread\n\nTo view all the treads', true)
    message.reply(Tread);
  }
  let addTag = cmd + ' add ';
  
  let Addmsg = message.content.slice(addTag.length);
  if(message.content.startsWith(addTag)){
  const splitArgs = Addmsg.split(' ');
			const tagName = splitArgs.shift();
			const tagDescription = splitArgs.join(' ');

			try {
				// equivalent to: INSERT INTO tags (name, descrption, username) values (?, ?, ?);
				const tag = await main.suggest().create({
					name: tagName,
					description: tagDescription,
					username: message.author.tag,
				});
				return message.reply(`:white_check_mark: Tread **${tag.name}** has been created.`);
			} catch (e) {
				if (e.name === 'SequelizeUniqueConstraintError') {
          
					return message.reply('That tread has already exists.');
				}
				return message.reply('Something went wrong with creating a tread.');
			}
  // message.reply(gandu.suggest());
  }
  let TagInfo = cmd + ' view ';
  let getTagInfo = message.content.slice(TagInfo.length);
  if (message.content.startsWith(TagInfo)) {
			const tagName = getTagInfo;
 
			const tag = await main.suggest().findOne({ where: { name: tagName } });
			if (tag) {
				// equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
				tag.increment('usage_count');
				return message.channel.send(tag.get('description'));
			}
			return message.reply(`Could not find tread: ${tagName}`);
  }
  let TagEdit = cmd + ' edit ';
  let getTagEdit = message.content.slice(TagEdit.length);
  if (message.content.startsWith(TagEdit)) {
			const splitArgs = getTagEdit.split(' ');
			const tagName = splitArgs.shift();
			const tagDescription = splitArgs.join(' ');

			// equivalent to: UPDATE tags (descrption) values (?) WHERE name = ?;
			const affectedRows = await main.suggest().update({ description: tagDescription }, { where: { name: tagName } });
			if (affectedRows > 0) {
				return message.reply(`:white_check_mark: Tread **${tagName}** was edited.`);
			}
			return message.reply(`Could not find a tread with name ${tagName}.`);
		}
  let TagInfo1 = cmd + ' tread ';
  let getTagInfo1 = message.content.slice(TagInfo1.length);
  if (message.content.startsWith(TagInfo1)) {
			const tagName = getTagInfo1;
      
			const tag = await main.suggest().findOne({ where: { name: tagName } });
			if (tag) {
        let viewTag = new Discord.MessageEmbed()
        .setColor('GREEN')
        .addField(`Tread`, `**${tagName}** was created by ${tag.username}`, true)
        .addField(`Views`, `${tag.usage_count} views`, true)
        .setTimestamp(tag.createdAt)
				return message.channel.send(viewTag);
			}
			return message.reply(`Could not find tread: ${tagName}`);
		}
  
  let showTag = cmd + ' treads';
  if (message.content.startsWith(showTag)) {
			// equivalent to: SELECT name FROM tags;
			const tagList = await main.suggest().findAll({ attributes: ['name'] });
			const tagString = tagList.map(t => t.name).join(', ') || 'There is no tread :/';
			return message.channel.send(`List of treads : ${tagString}`);
		}
  let TagRemove = cmd +' delete ';
  let getTagRemove = message.content.slice(TagRemove.length);
  if (message.content.startsWith(TagRemove)) {
			// equivalent to: DELETE from tags WHERE name = ?;
     if(message.author.id == '697418101616148561'){
			const tagName = getTagRemove;
			const rowCount = await main.suggest().destroy({ where: { name: tagName } });
			if (!rowCount) return message.reply('That tread did not exist.');

			return message.reply(tagName + ' Tread has deleted.');
		}
  }
  if(message.author.id !== '697418101616148561') return message.reply('Only bot admins could do that!');
};

module.exports.help = {
  name: "tread",
  type: "fun",
  about: "To make suggestion or tread you want",
  aliases: [""]
};
