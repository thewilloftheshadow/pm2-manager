const { MessageEmbed } = require("discord.js")
const { rawList } = require("../../pmtwo")

module.exports = {
    command: {
      name: "list",
      description: "List processes",
    },
    permissions: [],
    run: async (interaction, client) => {
      await interaction.deferReply()
      let allP = rawList()

      let embed = new MessageEmbed().setTitle(`Process List`).setDescription(`\`\`\`bash\n${allP}\`\`\``)

      interaction.editReply({embeds: [embed]})
    },
  }
  