import debug from "debug"

const COLOURS = {
  debug: "lightblue",
  info: "blue",
  warn: "pink",
  error: "red"
}

class Log {
  BASE = "beamfi"

  generateMessage(level, message, source?) {
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

  debug(message, source?) {
    return this.generateMessage("debug", message, source)
  }

  info(message, source?) {
    return this.generateMessage("info", message, source)
  }

  warn(message, source?) {
    return this.generateMessage("warn", message, source)
  }

  error(message, source?) {
    return this.generateMessage("error", message, source)
  }

  logObject(mesg, object?) {
    if (object == null) {
      return
    }

    this.info(mesg)

    try {
      const jsonString = JSON.stringify(object)
      this.info(jsonString)
    } catch (error) {
      this.info(object)
    }
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

const log = new Log()

export default log
