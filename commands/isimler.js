const { MessageEmbed, Message, Client } = require("discord.js");
const db = require("inflames.db");
const Settings = require('../config.js');
const cnf = require('../config.js');
const moment = require("moment");
module.exports.run = async (client, message, args) => {
    const yetkihata = new MessageEmbed()
    .setDescription(`Bu Komudu Kullanabilmek için <@&${cnf.regyetkili}> Rolüne Sahip Olman Gerekiyor`)
    .setFooter(cnf.footer)
    .setColor('RED')
  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(Settings.regyetkili)) return message.channel.send(yetkihata).then(x => x.delete({ timeout: 6500 }));

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
  if (!user) return message.channel.send(embedx.setDescription("Bir Üye Etiketlemen Gerek."))
  let check = await db.has(`isimler.${user.id}`)
  if (check === false) return message.channel.send(new MessageEmbed().setAuthor(user.user.username, user.user.avatarURL({ dynamic: true })).setDescription("Bu üyenin isim kayıtına ulaşamadım!").setTimestamp().setColor(Settings.Colors.Red))

  let fetch = await db.get(`isimler.${user.id}`)
  let sayı = await db.get(`sayı.${user.id}`)
  let isimler = fetch.length > 0 ? fetch.map((value, index) => `${index + 1}. \`${value.Name} | ${value.Age}\` (<@&${value.Rol}>)`).join(`\n`) : "Bu üyenin isim kayıtı bulunamadı!";

  const embed = new MessageEmbed()
  .setAuthor(user.user.username, user.user.avatarURL({ dynamic: true }))
  .setTitle(`Bu üyenin toplamda ${sayı} isim kayıtı bulundu:`)
  .setDescription(`${isimler}`)
  .setColor('GREEN')
  message.channel.send(embed);
};

exports.config = {
    name: "isimler",
    guildOnly: true,
    aliases: ["names"],
  };