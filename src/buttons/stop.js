const { stop } = require("../pmtwo")

module.exports = async (interaction, client, args) => {
  interaction.deferUpdate()

  interaction.message.edit({ content: "<a:loading:941734498872197191> Stopping process... " })
  await new Promise((x) => setTimeout(x, 3000))

  let r = await stop(args[0])

  if (!r) interaction.message.edit({ content: "Process failed to stop" })
  interaction.message.edit({ content: "Process has been stopped", embeds: [], components: [] })
}
