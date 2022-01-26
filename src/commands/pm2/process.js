const { list } = require("../../pmtwo")

module.exports = {
    command: {
      name: "process",
      description: "Get process info",
      defaultPermission: true,
      options: [
          {
              type: "STRING",
              name: "name",
              description: "The name of the process",
              autocomplete: true,
              required: true
          }
      ]
    },
    permissions: [],
    run: async (interaction, client) => {
      let allP = list()

      let p = allP.find(x => x.name == interaction.options.get("name").value)

      interaction.reply({content: JSON.stringify(p, null, 2)})
    },
  }
  