import Compressor from "compressorjs"

export function arrayBufferToImgSrc(arrayBuffer, imgType = "jpeg") {
  const byteArray = new Uint8Array(arrayBuffer)
  const picBlob = new Blob([byteArray], { type: `image/${imgType}` })
  const picSrc = URL.createObjectURL(picBlob)
  return picSrc
}

async function readFileToArrayBuffer(file): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result as ArrayBuffer)
    }

    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

export async function fileToCanisterBinaryStoreFormat(file) {
  const arrayBuffer: ArrayBuffer = await readFileToArrayBuffer(file)
  return Array.from(new Uint8Array(arrayBuffer))
}

export function convertBase64ToCanisterFileStoreFormat(base64String) {
  const byteCharacters = atob(base64String)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }

  return Array.from(new Uint8Array(byteNumbers))
}

const DefauttMaxWidth = 768

export const resizeImage = async (file, maxWidth) => {
  return new Promise(resolve => {
    new Compressor(file, {
      quality: 0.8,
      maxWidth: maxWidth || DefauttMaxWidth,
      mimeType: "image/jpeg",
      success(result) {
        resolve(result)
      },
      error(err) {
        resolve(err)
      }
    })
  })
}
