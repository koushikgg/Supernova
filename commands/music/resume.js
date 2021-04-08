const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const {delay} = require("../../handlers/functions")
module.exports = {
    name: "resume",
    category: "Music",
    aliases: ["r"],
    cooldown: 4,
    useage: "resume",
    description: "Resumes the Song",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const { channel } = message.member.voice;
      if(!channel)
        return message.channel.send(`**❌ ERROR | Please join a voice channel`);
      if(!client.distube.getQueue(message))
        return message.channel.send(`**❌ ERROR | I am not playing Something**`);
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
        return message.channel.send(`**❌ ERROR | Please join to the Channel where im playing**`);
      if(client.distube.isPlaying(message))
        return message.channel.send(`**❌ ERROR | Cannot resume the Song, It's already resumed, so I cant**`);
      message.channel.send(`**▶ Music Resumed**`)

      client.distube.resume(message);
      await delay(100);
      client.distube.pause(message);
      await delay(100);
      client.distube.resume(message);
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
