const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const ms = require("ms")
const { list } = require("../../pmtwo")

module.exports = {
    command: {
      name: "process",
      description: "Get process info",
      defaultPermission: true,
      adminGuild: true,
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
      await interaction.deferReply()
      let allP = list()

      let p = allP.find(x => x.name == interaction.options.get("name").value || x.id == interaction.options.get("name").value)
      console.log(interaction.options.get("name").value, allP)

      if(!p) return interaction.editReply("Process not found")

      let embed = new MessageEmbed().setTitle(`Process Info for \`${p.name}\``).setDescription("")
      embed.description += `Current Status: \`${p.status}\`\n`
      p.status == "online" ? embed.description += `Online since <t:${Math.floor((Date.now() - ms("5m"))/1000)}:R>\n` : null
      embed.description += `CPU: ${p.cpu}\n`
      embed.description += `Memory: ${p.memory}\n`
      embed.description += `Restarts: ${p.restarts}\n`

      let row = new MessageActionRow()
      .addComponents([
        new MessageButton().setLabel("Restart").setStyle("SUCCESS").setCustomId(`restart-${p.id}`),
        new MessageButton().setLabel("Stop").setStyle("DANGER").setCustomId(`stop-${p.id}`),
        new MessageButton().setLabel("Logs").setStyle("SECONDARY").setCustomId(`logs-${p.id}`),
      ])

      interaction.editReply({embeds: [embed], components: [row]})
      //interaction.reply({content: JSON.stringify(p, null, 2)})
    },
  }
  