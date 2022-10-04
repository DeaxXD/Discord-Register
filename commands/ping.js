const Discord = require("discord.js"),
client = new Discord.Client();
const cnf = require('../config.js')
module.exports.run = async (client, message, args) => {
    const pingemd = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setDescription(`
    
    :ping_pong: *Gecikme Sürem*: \`${Math.round(client.ws.ping)}\` ms
    
    :
    `)
    .setFooter(cnf.footer)
    .setThumbnail(message.author.displayAvatarURL())
message.channel.send(pingemd)
};

exports.config = {
  name: "ping",
  guildOnly: true,
  aliases: [],
};