
const Discord = require("discord.js");
const config = require("./../config.json");
const prefix = config.prefix;
const cheerio = require("cheerio");
const axios = require("axios");

module.exports.run = async (bot, message, args) => {
  if (!message.content.startsWith(prefix)) return;
  let command = prefix + module.exports.help.name + 1;
  let say = message.content.slice(command.length);

  let WeaponName = message.content.slice(5);
  axios.get(`https://www.reddit.com/search/?q=${WeaponName}`).then(response => {
    const loadData = cheerio.load(response.data);
    const WeaponContainer = loadData(
      "div._1oQyIsiPHYt6nx7VOmd1sz.bE7JgM2ex7W3aF3zci5bm.D3IyhBGwXo9jPwz-Ka0Ve.scrollerItem.Post"
    );
    for (let i = 0; i < 1; i++) {
      const GagTitle = loadData(WeaponContainer[i]).find(
        "h3._eYtD2XCVieq6emjKBH3m"
      )[0];
      const ItemAmmo = loadData(WeaponContainer[i]).find("a")[0];
      // const ItemIcon = loadData(WeaponContainer[i]).find('a.image.image-thumbnail img.pi-image-thumbnail')[0]
      if (GagTitle) {
        const WeaponType = loadData(GagTitle).text();
        const Meme = loadData(ItemAmmo).attr("href");
        // const WeaponIcon = loadData(ItemIcon).text()

        const WeaponEmbed = new Discord.MessageEmbed();
        WeaponEmbed.setTitle(`${WeaponType}`);
        WeaponEmbed.setImage(Meme);
        WeaponEmbed.setColor("#ff2655");
        message.channel.startTyping();
        setTimeout(() => {
          message.channel.send(WeaponEmbed).then(message => {
            message.channel.stopTyping();
          });
        }, 2000);
      }
    }
  });
};

module.exports.help = {
  name: "meme",
  type: "fun",
  usage: `${prefix}meme hot meme`,
  about: 'Literally a meme command, to display meme',
  aliases: [""]
};
