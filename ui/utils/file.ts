export function arrayBufferToFileSrc(arrayBuffer, mimeType) {
  const byteArray = new Uint8Array(arrayBuffer)
  const picBlob = new Blob([byteArray], { type: mimeType })
  const picSrc = URL.createObjectURL(picBlob)
  return picSrc
}
