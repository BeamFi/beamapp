import ESAPI from "node-esapi"

const encoder = ESAPI.encoder()

export const sanitizeJSURL = url => {
  return encoder.encodeForJavaScript(encoder.encodeForURL(url))
}
