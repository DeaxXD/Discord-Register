const { Discord, MessageEmbed } = require("discord.js")
const cnf = require('../config.js')
const db = require('inflames.db')

module.exports.run = async (client, message, args) => {

    const yetkihata = new MessageEmbed()
    .setDescription(`Bu Komudu Kullanabilmek için <@&${cnf.regyetkili}> Rolüne Sahip Olman Gerekiyor`)
    .setFooter(cnf.footer)
    .setColor('RED')
  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(Settings.regyetkili)) return message.channel.send(yetkihata).then(x => x.delete({ timeout: 6500 }));


  let users = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!users) return message.channel.send(embedx.setDescription(`Bir Üye Etiketlemelisin.`).setTimestamp().setColor("RED"))
  const unregister = message.guild.roles.cache.find(r => r.id === (cnf.kayıtsız))

  users.setNickname(cnf.isim)
users.roles.add(unregister);
users.roles.cache.forEach(r => {
users.roles.remove(r.id)
});
}
exports.config = {
    name: "kayıtsız",
    guildOnly: true,
    aliases: ["unregister", "unreg"],
  };