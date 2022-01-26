const { list } = require("../pmtwo")

module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isAutocomplete()) return

    if (interaction.commandName == "process") {
      const response = []
      let processes = list()
      let input = interaction.options.get("name")?.value
      for (let p in processes) {
        if ((input && p.toLowerCase().includes(input.toLowerCase())) || !input) {
          response.push({ name: processes[p].name, value: processes[p].id })
        }
      }
      interaction.respond(response)
    }
  })
}
