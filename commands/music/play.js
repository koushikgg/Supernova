const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
module.exports = {
    name: "play",
    category: "Music",
    aliases: ["p", "playsong", "playtrack"],
    cooldown: 4,
    usage: "play <URL / TITLE>",
    description: "Plays a song from youtube",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const { channel } = message.member.voice;
      if(!channel)
        return message.channel.send(`**❌ ERROR | Please join a voice channel`);
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
        return message.channel.send(`**❌ ERROR | Please join to the Channel where im playing**`);
      if(!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor("RANDOM")
          .setFooter(client.user.username, client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | You didn't provided a Searchterm`)
          .setDescription(`Usage: \`${prefix}play <URL / TITLE>\``)
        );
      message.channel.send(`**<:youtube:829780299688575057> Searching :mag_right:** \`${text}\``)
      client.distube.play(message, text);
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor("RANDOM")
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTitle(`:x: ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}