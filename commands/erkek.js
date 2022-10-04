const Discord = require("discord.js")
const cnf = require('../config.js')
const db = require('inflames.db')
module.exports.run = async (client, message, args) => {
    const yetkihata = new Discord.MessageEmbed()
    .setDescription(`Bu Komudu Kullanabilmek için <@&${cnf.regyetkili}> Rolüne Sahip Olman Gerekiyor`)
    .setFooter(cnf.footer)
    .setColor('RED')
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(cnf.regyetkili)) return message.channel.send(yetkihata).then(x => x.delete({ timeout: 6500 }))
    const tag = cnf.tag;
    const reglog = message.guild.channels.cache.find(r => r.id === (cnf.botlog))
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let isim = args[1]
    let yaş = args[2]
    let uyarıembed = new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL()).setColor('RED')
  if (!user) return message.channel.send(uyarıembed.setDescription("İsmini değiştireceğin kişiyi etiketlemelisin.")).then(x => x.delete({ timeout: 4000 }));
  if (!isim) return message.channel.send(uyarıembed.setDescription("İsmini değiştireceğin kişinin ismini yazmalısın.")).then(x => x.delete({ timeout: 4000 }));
  if (!yaş) return message.channel.send(uyarıembed.setDescription("İsmini değiştireceğin kişinin yaşını yazmalısın.")).then(x => x.delete({ timeout: 4000 }));

  user.setNickname(`${tag} ${isim} | ${yaş}`)
user.roles.add(cnf.erkek)
user.roles.remove(cnf.kayıtsız)

let embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true}))
.setDescription(`${user} Adlı kişi ${message.author} tarafından <@&${cnf.erkek}> Rolü verilerek kayıt edildi. \n  Kişinin yeni ismi: \`${isim}\` | \`${yaş}\``)
message.channel.send(embed);

const log = new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL())
.setColor('BLUE')
.setTitle("KAYIT [ERKEK]")
.setDescription(`• Yetkili: ${message.author} (\`${message.author.id}\`) \n • Kullanıcı: ${user}(\`${user.id}\`) \n • Verilen Roller: <@&${cnf.erkek}>`)
await reglog.send(log)

// DB KAYIT
db.add(`sayı.${user.id}`, +1)
const sıra = await db.fetch('case')
await db.push(`isimler.${user.id}`, {
    Registerer: message.author.id,
    Name: isim,
    Age: yaş,
    Rol: cnf.erkek
    
  });
  db.add(`${message.author.id}.toplam`, +1)
  db.add(`${message.author.id}.erkek`, +1)
  db.add('case', 1)
}

exports.config = {
    name: "erkek",
    guildOnly: true,
    aliases: ["e", "man"],
  };