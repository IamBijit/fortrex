const Discord = require("discord.js");
const cheerio = require("cheerio");
const axios = require("axios");
const config = require("./../config.json");
const prefix = config.prefix;

module.exports.run = async (bot, message, args) => {
  if (!message.content.startsWith(prefix)) return;

  let command = prefix + module.exports.help.name + 1;

  let msg = message.content.slice(command.length);
  if (msg === "") {
    let embed = new Discord.MessageEmbed()
      .setColor("#ff2655")
      .setAuthor("Valorant", config.valorant, config.valURL)
      .addField("Current Bot Prefix", `${prefix}`, false)
      .addField(
        "Commands",
        "`valorant all`\n\n`valorant agent [name]`" +
          "\n\n`valorant map [name]`\n\n`valorant weapon [name]`",
        true
      )
      .addField(
        "Description",
        "To view all the stuff \n\nTo get details about an agent" +
          "\n\nTo get details about a map\n\nTo get details about a weapon",
        true
      );

    message.channel.send(embed);
  }
  //Fetch Valorant  Map Data
  let MapName = prefix + module.exports.help.name + " map ";
  if (message.content.startsWith(MapName)) {
    let isMap = message.content.slice(MapName.length);

    axios.get(`https://valorant.fandom.com/wiki/${isMap}`).then(response => {
      const loadData = cheerio.load(response.data);
      const mapContainer = loadData(
        "aside.portable-infobox.pi-background.pi-theme-wikia.pi-layout-default"
      );
      for (let i = 0; i < 1; i++) {
        const mapImage = loadData(mapContainer[i]).find(
          "img.pi-image-thumbnail"
        )[0];
        const miniMap = loadData(mapContainer[i]).find(
          "img.pi-image-thumbnail"
        )[1];
        const mapT1 = loadData(mapContainer[i]).find(
          "h3.pi-data-label.pi-secondary-font"
        )[0];
        const mapD1 = loadData(mapContainer[i]).find(
          "div.pi-data-value.pi-font"
        )[0];

        if (mapImage) {
          const getMap = loadData(mapImage).attr("src");
          const MT1 = loadData(mapT1).text();
          const MD1 = loadData(mapD1).text();
          const smallMap = loadData(miniMap).attr("src");

          const mapEmbed = new Discord.MessageEmbed()
            .setAuthor("Valorant", config.valorant, config.valURL)
            .setColor(config.primary)
            .setImage(`${getMap}`)
            .addField("Name", isMap, true)
            .addField(MT1, MD1, true)
            .setThumbnail(smallMap);
          message.channel.startTyping();
          setTimeout(() => {
            message.channel.send(mapEmbed).then(message => {
              message.channel.stopTyping();
            });
          }, 1000);
        }
      }
    });
  }

  //Fetch Valorant  Weapon Data
  let GunName = prefix + module.exports.help.name + " weapon ";
  if (message.content.startsWith(GunName)) {
    let isWeapon = message.content.slice(GunName.length);

    axios.get(`https://valorant.fandom.com/wiki/${isWeapon}`).then(response => {
      const loadData = cheerio.load(response.data);
      const gunContainer = loadData(
        "aside.portable-infobox.pi-background.pi-theme-wikia.pi-layout-default"
      );
      for (let i = 0; i < 1; i++) {
        const GunImage = loadData(gunContainer[i]).find(
          "img.pi-image-thumbnail"
        )[0];
        const AgentD1 = loadData(gunContainer[i]).find(
          "div.pi-data-value.pi-font"
        )[1];
        const AgentT1 = loadData(gunContainer[i]).find(
          "h3.pi-data-label.pi-secondary-font"
        )[1];
        const AgentD2 = loadData(gunContainer[i]).find(
          "div.pi-data-value.pi-font"
        )[2];
        const AgentT2 = loadData(gunContainer[i]).find(
          "h3.pi-data-label.pi-secondary-font"
        )[2];
        const AgentD3 = loadData(gunContainer[i]).find(
          "div.pi-data-value.pi-font"
        )[4];
        const AgentT3 = loadData(gunContainer[i]).find(
          "h3.pi-data-label.pi-secondary-font"
        )[4];
        const AgentD4 = loadData(gunContainer[i]).find(
          "div.pi-data-value.pi-font"
        )[6];
        const AgentT4 = loadData(gunContainer[i]).find(
          "h3.pi-data-label.pi-secondary-font"
        )[6];

        if (GunImage) {
          const getAgent = loadData(GunImage).attr("src");
          const AgentData1 = loadData(AgentD1).text();
          const AgentType = loadData(AgentD2).text();
          const AgentDesc = loadData(AgentD3).text();
          const AgentUltimate = loadData(AgentD4).text();

          const AT1 = loadData(AgentT1).text();
          const AT2 = loadData(AgentT2).text();
          const AT3 = loadData(AgentT3).text();
          const AT4 = loadData(AgentT4).text();

          const gunEmbed = new Discord.MessageEmbed()
            .setAuthor("Valorant", config.valorant, config.valURL)
            .setColor(config.primary)
            .setImage(`${getAgent}`)
            .addField("Name", isWeapon, true)
            .addField(AT1, AgentData1, true)
            .addField(AT2, AgentType, true)
            .addField(AT3, AgentDesc, true)
            .addField(AT4, AgentUltimate, true);
          message.channel.startTyping();
          setTimeout(() => {
            message.channel.send(gunEmbed).then(message => {
              message.channel.stopTyping();
            });
          }, 1000);
        }
      }
    });
  }
  //Fetch Valorant Agent Data
  let AgentName = prefix + module.exports.help.name + " agent ";
  if (message.content.startsWith(AgentName)) {
    let isAgent = message.content.slice(AgentName.length);

    axios.get(`https://valorant.fandom.com/wiki/${isAgent}`).then(response => {
      const loadData = cheerio.load(response.data);
      const WeaponContainer = loadData(
        "aside.portable-infobox.pi-background.pi-theme-wikia.pi-layout-default"
      );
      for (let i = 0; i < 1; i++) {
        const AgentImage = loadData(WeaponContainer[i]).find(
          "img.pi-image-thumbnail"
        )[0];
        const AgentD1 = loadData(WeaponContainer[i]).find(
          "div.pi-data-value.pi-font"
        )[1];
        const AgentT1 = loadData(WeaponContainer[i]).find(
          "h3.pi-data-label.pi-secondary-font"
        )[1];
        const AgentD2 = loadData(WeaponContainer[i]).find(
          "div.pi-data-value.pi-font"
        )[2];
        const AgentT2 = loadData(WeaponContainer[i]).find(
          "h3.pi-data-label.pi-secondary-font"
        )[2];
        const AgentD3 = loadData(WeaponContainer[i]).find(
          "div.pi-data-value.pi-font"
        )[4];
        const AgentT3 = loadData(WeaponContainer[i]).find(
          "h3.pi-data-label.pi-secondary-font"
        )[4];
        const AgentD4 = loadData(WeaponContainer[i]).find(
          "div.pi-data-value.pi-font"
        )[6];
        const AgentT4 = loadData(WeaponContainer[i]).find(
          "h3.pi-data-label.pi-secondary-font"
        )[6];

        if (AgentImage) {
          const getAgent = loadData(AgentImage).attr("src");
          const AgentData1 = loadData(AgentD1).text();
          const AgentType = loadData(AgentD2).text();
          const AgentDesc = loadData(AgentD3).text();
          const AgentUltimate = loadData(AgentD4).text();

          const AT1 = loadData(AgentT1).text();
          const AT2 = loadData(AgentT2).text();
          const AT3 = loadData(AgentT3).text();
          const AT4 = loadData(AgentT4).text();

          const agentEmbed = new Discord.MessageEmbed()
            .setAuthor("Valorant", config.valorant, config.valURL)
            .setColor(config.primary)
            .setImage(`${getAgent}`)
            .addField("Name", isAgent, true)
            .addField(AT1, AgentData1, true)
            .addField(AT2, AgentType, true)
            .addField(AT3, AgentDesc, true)
            .addField(AT4, AgentUltimate, true);
          message.channel.startTyping();
          setTimeout(() => {
            message.channel.send(agentEmbed).then(message => {
              message.channel.stopTyping();
            });
          }, 1000);
        }
      }
    });
    if (AgentName === "") {
      return message.reply(
        "Please specify the agent, like this `valorant agent jett`"
      );
    }
  }

  // List Of Agents
  let AgentList = prefix + module.exports.help.name + " all";
  if (message.content.startsWith(AgentList)) {
    let allAgents = "";
    let allMaps = "";
    let allguns = "";
    axios.get("https://pcgameson.com/fortrex/valorant/main.html").then(response => {
      // Load the web page source code into a cheerio instance
      const $ = cheerio.load(response.data);
      const urlElems = $(
        "div.agents ul"
      );
      const  getAgents = $("div.agents ul li");      
      const  getMaps = $("div.maps ul li");
       const  getGuns = $("div.weapons ul li");


      for (let i = 0; i < getAgents.length; i++) {
        const urlSpan = $(getAgents[i]).find(
          "a"
        )[0];
        if (urlSpan) {
          const urlText = $(urlSpan).text();
          const Agents1 = '`' + `${urlText}` + '` ';
          let agentArr = Agents1;
          allAgents += `\n${agentArr}`;
        }
      }
      for (let i = 0; i < getMaps.length; i++) {
        const urlSpan = $(getMaps[i]).find(
          "a"
        )[0];
        if (urlSpan) {
          const urlText = $(urlSpan).text();
          const Agents1 = '`' + `${urlText}` + '` ';
          let agentArr = Agents1;
          allMaps += `\n${agentArr}`;
        }
      }
      for (let i = 0; i < getGuns.length; i++) {
        const urlSpan = $(getGuns[i]).find(
          "a"
        )[0];
        if (urlSpan) {
          const urlText = $(urlSpan).text();
          const Agents1 = '`' + `${urlText}` + '` ';
          let agentArr = Agents1;
          allguns += `\n${agentArr}`;
        }
      }
      let menu = new Discord.MessageEmbed()
      .setColor(config.primary)
      .addField("Current Bot Prefix", '` '+`${prefix}` + ' `', false)
      .addField('Agents', `${allAgents}`, true)
      .addField('Weapons', `${allguns}`, true)
      .addField('Maps', `${allMaps}`, true)
      .setAuthor("Valorant", config.valorant, config.valURL)
      
        message.channel.startTyping();
  message.delete();
  setTimeout(() => {
    message.channel.send(menu).then(message => {
      message.channel.stopTyping();
    });
  }, 1000);
      // message.channel.send(menu);
    });
  }
};

module.exports.help = {
  name: "valorant",
  type: "games",
  usage: "`valorant`",
  about: "Full GamePedia for Valorant",
  aliases: [""]
};
