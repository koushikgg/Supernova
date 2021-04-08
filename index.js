//Importing all needed Commands
const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const filters = require("./filters.json")
const DisTube = require("distube")
const colors = require("colors"); //this Package is used, to change the colors of our Console! (optional and doesnt effect performance)
const { format } = require("./handlers/functions")

const fs = require("fs"); //this package is for reading files and getting their inputs
//Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages


const client = new Discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
//Client variables to use everywhere
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");
client.cooldowns = new Discord.Collection();


["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

//Whenever the bot joins a server, If you wanna add that. Just remove the '//'

//client.on('guildCreate', guild => {
  //guild.systemChannel.send({
    //embed:{
        //title: 'Thanks for Inviting me to the Server!',
        //color: "RANDOM", 
        //description: "To know all of my commands, Type `dubu?help`",

        //fields:[
            //{
                //name: 'Join our Server',
                //value: '[Server Link](https://discord.gg/zqR4wyaPYq)'
            //},    
        //],

    //image: {
        //url: 'https://thumbs.gfycat.com/TerribleValuableAlbertosaurus-size_restricted.gif',
    //},

        //footer: {
        //text: 'Dubu🦅 Made by: Wonyoungieeeeee#2004'

        //}
    //}
  //});
//});

client.distube = new DisTube(client, {
    searchSongs: false,
    leaveOnEmpty: false,
    customFilters: filters,
    leaveOnFinish: false,
    leaveOnStop: false,
    emitNewSongOnly: false,
    highWaterMark: 1024*1024*64
})

 const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

  // DisTube event listeners, more in the documentation page
  client.distube
      .on("playSong", (message, queue, song) => message.channel.send(new MessageEmbed()
        .setTitle("Now Playing :notes: " + song.name)
        .setURL(song.url)
        .setColor("RANDOM")
        .addField("Duration", `\`${song.formattedDuration}\``)
        .addField("Queue Status", status(queue))
        .setThumbnail(song.thumbnail)
        .setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
        )
      )
      .on("addSong", (message, queue, song) => message.channel.send(new MessageEmbed()
          .setTitle("Added :thumbsup: " + song.name)
          .setURL(song.url)
          .setColor("RANDOM")
          .addField(`${queue.songs.length} Songs in the Queue`, `Duration: \`${format(queue.duration*1000)}\``)
          .addField("Duration", `\`${song.formattedDuration}\``)
          .setThumbnail(song.thumbnail)
          .setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
        )
      )
      .on("playList", (message, queue, playlist, song) => message.channel.send(new MessageEmbed()
            .setTitle("Playing Playlist :notes: " + playlist.name + ` - \`[${playlist.songs.length} songs]\``)
            .setURL(playlist.url)
            .setColor("RANDOM")
            .addField("Current Track: ", `[${song.name}](${song.url})`)
            .addField("Duration", `\`${playlist.formattedDuration}\``)
            .addField(`${queue.songs.length} Songs in the Queue`, `Duration: \`${format(queue.duration*1000)}\``)
            .setThumbnail(playlist.thumbnail.url)
            .setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
        )
      )
      .on("addList", (message, queue, playlist) => message.channel.send(new MessageEmbed()
            .setTitle("Added Playlist :thumbsup: " + playlist.name + ` - \`[${playlist.songs.length} songs]\``)
            .setURL(playlist.url)
            .setColor("RANDOM")
            .addField("Duration", `\`${playlist.formattedDuration}\``)
            .addField(`${queue.songs.length} Songs in the Queue`, `Duration: \`${format(queue.duration*1000)}\``)
            .setThumbnail(playlist.thumbnail.url)
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        )
      )
      .on("searchResult", (message, result) =>
          message.channel.send(new MessageEmbed()
                  .setTitle("**Choose an option from below**")
                  .setURL(song.url)
                  .setColor("RANDOM")
                  .setDescription(`${result.map((song, i) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n\n*Enter anything else or wait 60 seconds to cancel*`)
                  .setFooter(ee.footertext,ee.footericon)
          )
      )
      .on("searchCancel", (message) => message.channel.send(new MessageEmbed()
          .setColor("RANDOM")
          .setFooter(client.user.username, client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Search Cancelled`)
        )
      )
      .on("error", (message, e) => {
          console.log(String(e.stack).bgRed)
          message.channel.send(new MessageEmbed()
              .setColor("RANDOM")
              .setFooter(client.user.username, client.user.displayAvatarURL())
              .setTitle(`❌ ERROR | An error occurred`)
              .setDescription(`\`\`\`${e.stack}\`\`\``)
          )
      })
      .on("initQueue", queue => {
          queue.autoplay = false;
          queue.volume = 75;
          queue.filter = "clear";
      }
    )

//login into the bot
client.login(require("./config.json").token);