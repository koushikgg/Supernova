const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const createBar = require("string-progressbar")
const { toColonNotation } = require("colon-notation")
const { format } = require("../../handlers/functions")
module.exports = {
    name: "nowplaying",
    category: "Music",
    aliases: ["np"],
    cooldown: 4,
    useage: "nowplaying",
    description: "Shows current Track information",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const { channel } = message.member.voice;
      if(!channel)
        return message.channel.send(`**❌ ERROR | Please join a voice channel`);
      if(!client.distube.getQueue(message))
        return message.channel.send(`**❌ ERROR | I am not playing Something**`);
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
        return message.channel.send(`**❌ ERROR | Please join to the Channel where im playing**`);
      let queue = client.distube.getQueue(message);
      let track = queue.songs[0];
      const time = track.duration * 1000
      const currenttime = queue.currentTime
      const remaining = (time - currenttime) < 0 ? "◉ LIVE" : time - currenttime
      console.log(track)
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext,client.user.displayAvatarURL())
        .setTitle(`Now playing :notes: ${track.name}`.substr(0, 256))
        .setURL(track.url)
        .setThumbnail(track.thumbnail)
        .addField("Views", `▶ ${track.views}`,true)
        .addField("Dislikes", `:thumbsdown: ${track.dislikes}`,true)
        .addField("Likes", `:thumbsup: ${track.likes}`,true)
        .addField("Duration: ", `${createBar(time === 0 ? currenttime : time, currenttime, 10)[0]} \`[${queue.formattedCurrentTime}/${track.formattedDuration}]\`\n` +
                `${client.distube.isPaused(message) === true ? ":pause_button:" : ":arrow_forward:"} ${time === 0 ? "" : `| Time remaining: \`${toColonNotation(remaining)}\``}`)
      ).then(msg=>msg.delete({timeout: 4000}).catch(e=>console.log(e.message)))
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, client.user.displayAvatarURL())
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}