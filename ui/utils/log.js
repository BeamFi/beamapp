import debug from "debug"

const COLOURS = {
  debug: "lightblue",
  info: "blue",
  warn: "pink",
  error: "red"
}

class Log {
  BASE = "beamfi"

  generateMessage(level, message, source) {
    // Set the prefix which will cause debug to enable the message
    const namespace = `${this.BASE}:${level}`
    const createDebug = debug(namespace)

    // Set the colour of the message based on the level
    createDebug.color = COLOURS[level]

    if (source) {
      createDebug(source, message)
    } else {
      createDebug(message)
    }
  }

  debug(message, source) {
    return this.generateMessage("debug", message, source)
  }

  info(message, source) {
    return this.generateMessage("info", message, source)
  }

  warn(message, source) {
    return this.generateMessage("warn", message, source)
  }

  error(message, source) {
    return this.generateMessage("error", message, source)
  }

  logJSONObject(object) {
    if (object == null) {
      return
    }

    const jsonString = JSON.stringify(object)
    this.info(jsonString)
  }

  flattenCandidError(candidError) {
    const key =
      Object.keys(candidError).length > 0 ? Object.keys(candidError)[0] : null
    if (key == null) {
      return ""
    }

    const fullMesg = key + ": " + candidError[key]
    return fullMesg
  }
}

export default new Log()
