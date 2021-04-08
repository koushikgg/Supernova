const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
module.exports = {
    name: "pause",
    category: "Music",
    aliases: [""],
    cooldown: 4,
    useage: "pause",
    description: "Pauses the Music",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const { channel } = message.member.voice;
      if(!channel)
        return message.channel.send(`**❌ ERROR | Please join a voice channel`);
      if(!client.distube.getQueue(message))
        return message.channel.send(`**❌ ERROR | I am not playing Something**`);
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
        return message.channel.send(`**❌ ERROR | Please join to the Channel where im playing**`);
      if(client.distube.isPaused(message))
        return message.channel.send(`**❌ ERROR | Cannot pause the Song, It's already paused, so I cant**`);
      message.channel.send(`**⏸ Music Paused**`)

      client.distube.pause(message);
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

