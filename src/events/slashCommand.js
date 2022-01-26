module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return
    if (process.env.MAINTENANCE) return interaction.reply({ content: "The bot is currently in maintenance mode. Please try again later.", ephemeral: true })

    let commandFile = client.commands.get(interaction.commandName)

    if (!commandFile) return interaction.reply(`Command not found`)

    await commandFile.run(interaction, client).catch(async (error) => {
      console.error(error)
      interaction.deferred ? interaction.editReply({ content: "An error has occurred", ephemeral: true }) : interaction.reply({ content: "An error has occurred", ephemeral: true })
    })
  })
}
