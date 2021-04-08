const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
module.exports = {
    name: "skip",
    category: "Music",
    aliases: ["s"],
    cooldown: 4,
    useage: "skip",
    description: "Skips a track",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const { channel } = message.member.voice;
      if(!channel)
        return message.channel.send(`**❌ ERROR | Please join a Channel first**`);
      if(!client.distube.getQueue(message))
        return message.channel.send(`**❌ ERROR | I am not playing Something**`);
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
        return message.channel.send(`**❌ ERROR | Please join to the Channel where im playing**`);

      message.channel.send(`**⏭ Skipped!**`)

      client.distube.skip(message);
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