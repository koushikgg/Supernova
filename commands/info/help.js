const ms = require('ms')
const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../config.json')

module.exports = {
    name: "help",
    aliases: ['h', 'commands'],
    category: "info",
    run: async(client, message, args) => {

        let helpArray = message.content.split(" ");
        let helpArgs = helpArray.slice(1);

        if (!helpArgs[0]) {

            let embed = new MessageEmbed()
                .setTitle(`Eunbi🌹 Help Commands`)
                .setImage('https://media1.tenor.com/images/f9b2c35978950572f1fe0b6d4bbd61a8/tenor.gif?itemid=15555267')
                .setThumbnail(client.user.displayAvatarURL())
                .setColor('RANDOM')
                .setDescription(`✅ **My Prefix Is \`${prefix}\`**`)
                .addField(`🎶 Music [7] - `, '`play`, `stop`, `nowplaying`, `pause`, `queue`, `resume`, `skip`')
                .addField(`❗ Moderation [4] - `, '`ban`, `kick`, `mute`, `unmute`')
                .addField(`❓ Info[1] - `, '`help`')
                .setFooter(`${message.guild.me.displayName} | Total Commands - 12 Loaded | Bot Made By: Wonyoungieeeeeee#2004`, client.user.displayAvatarURL());

            message.channel.send(embed)
        }

        if(helpArgs[0]) {}
        let command = helpArgs[0];

        command = client.commands.get((command));
        try {
            let embed2 = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setImage('https://media1.tenor.com/images/f9b2c35978950572f1fe0b6d4bbd61a8/tenor.gif?itemid=15555267')
            .setColor('RANDOM')
                .setTitle(`Command: ${prefix}${command.name}`)
                .setDescription(`
            **Description:** ${command.description || "No description was provided"}
            **Usage:** ${prefix}${command.name} ${command.usage || " "}
            **Category:** ${command.category || "No category was provided"} 
            **Aliases:** ${command.aliases || "No alias was provided"}
            `)

            message.channel.send(embed2)
        }catch {

        }
    }

}
