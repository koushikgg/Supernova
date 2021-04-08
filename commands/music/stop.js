const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
module.exports = {
    name: "stop",
    category: "Music",
    aliases: ["leave"],
    cooldown: 4,
    useage: "stop",
    description: "Stops a track",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const { channel } = message.member.voice;
      if(!channel)
        return message.channel.send(`**❌ ERROR | Please join a Channel first**`);
      if(!client.distube.getQueue(message))
        return message.channel.send(`**❌ ERROR | I am not playing Something**`);
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
        return message.channel.send(`**❌ ERROR | Please join to the same channel where im playing**`);

      message.channel.send(`**⏹ Music Stopped!**`)

      client.distube.stop(message);
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter(ee.footertext, client.user.displayAvatarURL())
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}