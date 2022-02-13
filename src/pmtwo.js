const { exec, execSync } = require("child_process")

const runCmd = (input, options = {}) => {
  return execSync(input, options).toString().trim()
}

const runOutput = (input, options = {}) => {
  exec(input, options, (err, stdout, stderr) => {
    console.log(stdout, err, stderr)
    return stdout
  })
}

const rawList = () => {
  let list = runCmd("pm2 list")
  return list
}

const list = () => {
  let lines = runCmd("pm2 list").split("\n")
  if(lines[0].includes("PM2+ Activated")) lines.shift() // remove PM2+ Activated
  lines.splice(0, 3) // remove table headings
  lines.pop() // remove table end
  if(lines[lines.length - 1].includes("[WARN]")) lines.pop() // remove Not saved warning
  let cleaned = lines.map((x) => x.replace(/ /g, ""))
  let data = cleaned.map((x) => {
    let s = x.split("│")
    return {
      id: s[1],
      name: s[2],
      namespace: s[3],
      version: s[4],
      mode: s[5],
      pid: s[6],
      uptime: s[7],
      restarts: s[8],
      status: s[9],
      cpu: s[10],
      memory: s[11],
      user: s[12],
      watching: s[13] == "enabled",
    }
  })
  return data
}

const restart = (id) => {
  try {
    runCmd(`pm2 restart ${id}`)
  } catch {
    return false
  }
  return true
}

const stop = (id) => {
  try {
    runCmd(`pm2 stop ${id}`)
  } catch {
    return false
  }
  return true
}

const logs = (id, lines = 10) => {
  try {
    return runCmd(`pm2 logs ${id} --lines ${lines} --json --nostream`, { timeout: 3000 })
  } catch {
    return false
  }
}

module.exports = { rawList, list, runCmd, runOutput, restart, stop, logs }
