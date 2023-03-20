import ESAPI from "node-esapi"

const encoder = ESAPI.encoder()

export const sanitizeJSURL = (str: string): string => {
  return encoder.encodeForJavaScript(encoder.encodeForURL(str))
}
