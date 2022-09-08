export const validateHashtags = (hashtags, myToast) => {
  const maxNumHashtags = 30

  if (hashtags.length > maxNumHashtags) {
    myToast(
      "Hashtags",
      `Only a max of ${maxNumHashtags} hashtags are allowed.`,
      "warning"
    )
    return false
  }

  return true
}

export const validateCreatorTypes = (creatorTypes, myToast) => {
  const maxNum = 3
  const minNum = 1

  if (creatorTypes.length > maxNum) {
    myToast(
      "Creator Types",
      `Only a max of ${maxNum} creator types are allowed.`,
      "warning"
    )
    return false
  }
  if (creatorTypes.length < minNum) {
    myToast(
      "Creator Types",
      `A min of ${minNum} creator type is required.`,
      "warning"
    )
    return false
  }

  return true
}

export const validateProfileImage = (thumbImage, thumbImageSrc, myToast) => {
  if (!thumbImage && (!thumbImageSrc || thumbImageSrc == "")) {
    myToast(
      "Thumbnail picture missing",
      "Please upload your creator portfolio picture.",
      "warning"
    )
    return false
  }

  return true
}
