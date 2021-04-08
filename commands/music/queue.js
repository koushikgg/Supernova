module.exports = {
    name: "queue",
    aliases: ["qu", "list"],
    description: "Show me the queue",
    cooldown: "5",
    run: async (client, message) => {
        try {
            const queue = client.distube.getQueue(message)
            if (!queue) return message.channel.send("**❌There are no songs in the queue!**  ")
            const q = queue.songs.map((song, i) => {
                return `${i === 0? `- Playing: ${song.name} [${song.formattedDuration}] | ${song.user.tag}\n`: `${i}. ${song.name} [${song.formattedDuration}] | ${song.user.tag}`}`
            }).join("\n")
            message.channel.send(`Server Queue\n\n${q}`, {code: "markdown" })
        } catch (e) {
            message.channel.send(`An error occurred.\n\`${e}\``)
        }
    }
}