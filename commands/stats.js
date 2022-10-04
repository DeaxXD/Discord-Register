const { MessageEmbed, Client, Message, DiscordAPIError } = require("discord.js");
const moment = require("moment");
const Discord = require("discord.js")
const cnf = require('../config.js')
const db = require('inflames.db')
module.exports.run = async (client, message, args) => {
  
    const yetkihata = new MessageEmbed()
    .setDescription(`Bu Komudu Kullanabilmek için <@&${cnf.regyetkili}> Rolüne Sahip Olman Gerekiyor`)
    .setFooter(cnf.footer)
    .setColor('RED')
  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(Settings.regyetkili)) return message.channel.send(yetkihata).then(x => x.delete({ timeout: 6500 }));

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  if (!user) return message.channel.send(new MessageEmbed().setDescription("Bir üyeyi etiketlemelisin.")).then(x => x.delete({ timeout: 4000 }));
  let check = await db.has(`${message.author.id}.toplam`)
  if (check === false) return message.channel.send(new MessageEmbed().setAuthor(user.user.username, user.user.avatarURL({ dynamic: true })).setColor("RED").setDescription("Bu üyenin herhangi bir kayıt verisine ulaşamadım."))

  let kadınsayı = await db.get(`${message.author.id}.kadın`)
  let erkeksayı = await db.get(`${message.author.id}.erkek`)
  let toplam = await db.get(`${message.author.id}.toplam`)

  const embed = new MessageEmbed()
   .setAuthor(user.user.username, user.user.avatarURL({ dynamic: true }))
  .setDescription(`• Toplam Kaydettiği Kişi: **${toplam || "0"}**
  • Toplam Kaydettiği Kadın: **${kadınsayı || "0"}**
  • Toplam Kaydettiği Erkek: **${erkeksayı || "0"}**`)
  .setTimestamp()
  .setColor('GOLD')
  message.channel.send(embed)
};

exports.config = {
    name: "stats",
    guildOnly: true,
    aliases: ["kayıtsayı", "ks"],
  };