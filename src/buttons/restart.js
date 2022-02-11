const { restart } = require("../pmtwo")

module.exports = async (interaction, client, args) => {
  interaction.deferUpdate()

  interaction.message.edit({ content: "<a:loading:941734498872197191> Restarting process... " })
  await new Promise((x) => setTimeout(x, 3000))

  let r = await restart(args[0])

  if (!r) interaction.message.edit({ content: "Process failed to restart" })
  interaction.message.edit({ content: "Process has been restarted", embeds: [], components: [] })
}
