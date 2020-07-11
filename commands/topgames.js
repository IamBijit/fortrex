const Discord = require("discord.js");
const config = require("./../config.json");
const prefix = config.prefix;
const cheerio = require("cheerio");
const axios = require("axios");
const url = "https://pcgameson.com/fortrex"
const Icon = [
  "",
  "https://i.imgur.com/NyQucPe.png",
  "https://i.imgur.com/BsczYnp.png",
  "https://i.imgur.com/WFRpoGL.png"
];
module.exports.run = async (bot, message, args) => {
  if (!message.content.startsWith(prefix)) return;
  let command = prefix + module.exports.help.name + 1;
  let msg = message.content.slice(command.length);
  let topGames = "";
  let platform = message.content.slice(command.length);

  axios
    .get(
      `https://www.metacritic.com/browse/games/score/metascore/year/{${platform}/filtered?view=condensed&sort=desc`
    )
    .then(response => {
      // Load the web page source code into a cheerio instance
      const Loader = cheerio.load(response.data);

      // The pre.highlight.shell CSS selector matches all `pre` elements
      // that have both the `highlight` and `shell` class
      const urlElems = Loader("table.clamp-list.condensed tr.expand_collapse");

      // We now loop through all the elements found
      for (let i = 0; i < 10; i++) {
        const urlSpan = Loader(urlElems[i]).find("td.details h3")[0];
        const ratingSpan = Loader(urlElems[i]).find(
          "div.metascore_w.large.game.positive"
        )[0];

        if (urlSpan) {
          const urlText = Loader(urlSpan).text();
          const score = Loader(ratingSpan).text();
          let embed = new Discord.RichEmbed();
          let gameList =
            `** #${i + 1}:  ${urlText} **\n    ` +
            "  `Rating: " +
            score +
            "/100`";
          let gameArr = gameList;
          topGames += `\n${gameArr}`;
          let counter = i + 1;
          console.log(
            "**" +
              `#${counter} ` +
              urlText.trim() +
              "**" +
              "  `" +
              "Rating: " +
              score +
              "`"
          );
          console.log(urlText);
        }
      }
      let gameEmbed = new Discord.MessageEmbed()
        .setColor("#ff2962")
        .setAuthor(
        `TOP 10 ${platform.toUpperCase()} GAMES `,
        "https://i.imgur.com/WFRpoGL.png",
        "https://discord.js.org"
      )
        .setDescription(`${topGames}`)
        
      message.channel.startTyping();

      setTimeout(() => {
        message.channel.send(gameEmbed).then(message => {
          message.channel.stopTyping();
        });
      }, 2000);
    });
};

module.exports.help = {
  name: "topgames",
  type: "general",
  usage: '`' + `${prefix}` + 'topgames [platform]`',
  about: 'To display top games, platform: `pc` `xboxone` `ps4` `wii` `stadia`',
  aliases: [""]
};
