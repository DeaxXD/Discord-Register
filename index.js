const Discord = require('discord.js')
const client = new Discord.Client();
const cnf = require('./config.js')
const fs = require('fs')
require('./util/Loader.js')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.commands = new Discord.Collection(); 
client.aliases = new Discord.Collection(); 
fs.readdir('./commands/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {                      
    let props = require(`./commands/${f}`);   
    console.log(`${props.config.name} komutu yüklendi.`);  
    client.commands.set(props.config.name, props);
    props.config.aliases.forEach(alias => {         
      client.aliases.set(alias, props.config.name);  
    });
  });
})

client.login(cnf.token)


client.on("ready", async () => {
    let csc = cnf.seskanal
    client.channels.cache.get(csc).join()
    setInterval(() => {
    client.channels.cache.get(csc).join()
    }, 20000)
    }) 


let kayıtsız = cnf.kayıtsız;

client.on("guildMemberAdd", member => {
  member.roles.add(kayıtsız);
  member.setNickname(cnf.isim)
});


client.once("ready", async () => {
    console.log('Bağlandım')
   let kanal = client.channels.cache.find(r => r.id === cnf.botlog);
   kanal.send(`\`${client.user.tag}\` ismiyle bağlandım!`)
} )


client.on('message', async message => {
    if (message.content === 'bl!fakekatıl') { 
      client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
        }})