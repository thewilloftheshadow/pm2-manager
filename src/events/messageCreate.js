const fs = require("fs")
const ms = require("ms")
const shuffle = require("shuffle-array")
const { Util } = require("discord.js")

module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    if (!message.content.startsWith("+")) return
    const args = message.content.slice(`+`.length).split(/ +/)
    console.log(args)
    let cmd = args.shift().toLowerCase()
    if (cmd == "") cmd = args.shift().toLowerCase()

    console.log(message.content)
    console.log(`command: `, cmd)
    console.log(args)

    //if (message.member.roles.cache.has(ids.admin) || true) {
    if (cmd == "botstats") {
      let msg = {}
      msg.guilds = client.guilds.cache.size
      msg.users = client.guilds.cache.filter((guild) => guild.available).reduce((prev, curr) => prev + curr.memberCount, 0)
      message.channel.send(JSON.stringify(msg))
    }
    //}

    //if (ids.devs.includes(message.author.id) || true) {
    if (cmd == "updateslash") {
      const type = args[0] ?? "default"
      console.log("Updating slash commands...")

      try {
        let done = 0
        if (type == "admin") {
          client.commands
            .filter((x) => x.command.adminGuild)
            .each((cmd) => {
              if (!cmd.permissions) cmd.permissions = []
              let doPerms = [...cmd.permissions, { id: ids.server, type: "ROLE", permission: false }, { id: ids.admin, type: "ROLE", permission: true }]
              client.application.commands.create(cmd.command, message.guild.id, doPerms).then((command) => command.permissions.set({ command: command, permissions: doPerms }))
              done += 1
              console.log(`Loaded admin command`, cmd.command.name)
            })
        } else {
          client.commands
            .filter((x) => !x.command.adminGuild)
            .each((cmd) => {
              //client.application.commands.create(cmd.command, message.guild.id)
              client.application.commands.create(cmd.command, message.guild.id).then((command) => {
                if (!cmd.permissions) cmd.permissions = []
                let doPerms = [...cmd.permissions /*, { id: message.guild.id, type: "ROLE", permission: false }, { id: ids.admin, type: "ROLE", permission: true }*/]
                console.log(`Loaded command`, cmd.command.name, doPerms)
                command.permissions.set({ command: command, permissions: doPerms })
              })
              done += 1
            })
        }
        message.reply({ content: `${done} slash commands queued to be deployed in ${type}. Check console for live updates` })
      } catch (err) {
        console.error(err)
      }
    }

    if (cmd == "eval") {
      try {
        if (!args[0]) return message.channel.send("undefined", { code: "js" })

        let codeArr = args.slice(0).join(" ").split("\n")
        if (!codeArr[codeArr.length - 1].startsWith("return")) codeArr[codeArr.length - 1] = `return ${codeArr[codeArr.length - 1]}`

        const code = `async () => { ${codeArr.join("\n")} }`

        let out = await eval(code)()

        message.channel.send(`Typeof output: **${typeof out}**`)
        if (typeof out !== "string") out = require("util").inspect(out)
        out = out.replace(process.env.TOKEN, "[TOKEN REDACTED]").replace(process.env.MONGODB, "[DB URI REDACTED]")

        message.channel.send({ content: out ? out : "null", split: true, code: "js" })
      } catch (err) {
        message.channel.send("An error occurred when trying to execute this command.")
        console.log(err)
        return message.channel.send(`${err}`, { code: "js" })
      }
      //}
    }
  })
}
