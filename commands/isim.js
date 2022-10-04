const { MessageEmbed, Client, Message } = require("discord.js");
const Discord = require("discord.js")
const cnf = require('../config.js')
const db = require('inflames.db')


module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_NICKNAMES") && !message.member.roles.cache.has(cnf.regyetkili)) return message.channel.send(new MessageEmbed().setAuthor("Yetersiz Yetki").setDescription(`**\`»\`** Bu komutu kullanabilmek için yeterli yetkiye sahip olman gerekmekte.`).setColor("GOLD")).then(x => x.delete({ timeout: 5500 }));

  let billy = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let isim = args[1]
  let yaş = args[2]
  let tag = cnf.tag
  let uyarıembed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL()).setColor("RED")
  if (!billy) return message.channel.send(uyarıembed.setDescription("İsmini değiştireceğin kişiyi etiketlemelisin.")).then(x => x.delete({ timeout: 7000 }));
  if (!isim) return message.channel.send(uyarıembed.setDescription("İsmini değiştireceğin kişinin ismini yazmalısın.")).then(x => x.delete({ timeout: 7000 }));
  if (!yaş) return message.channel.send(uyarıembed.setDescription("İsmini değiştireceğin kişinin yaşını yazmalısın.")).then(x => x.delete({ timeout: 7000 }));

  billy.setNickname(`${tag} ${isim} | ${yaş}`)
  const embed = new MessageEmbed()
  .setDescription(`Başarıyla ${billy} üyesinin ismi \`${isim} | ${yaş}\` olarak değişti.`)
  .setColor("GOLD")
  .setTimestamp()
  message.channel.send(embed).then(x => x.delete({ timeout: 5000 }));
};

exports.config = {
    name: "isim",
    guildOnly: true,
    aliases: ["i", "nick"],
  };