const log = (await import("../../utils/log")).default

export const actorRunner = async (
  { appStore, showErrorMesg, finalClosure, errorClosure },
  closure
) => {
  try {
    if (closure) await closure()
  } catch (error) {
    const { SessionExpiredError } = await import("./actor-locator")
    if (error instanceof SessionExpiredError) {
      if (appStore) appStore.setSessionExpired(true)
    } else {
      log.error(error)
      if (showErrorMesg) showErrorMesg()
    }

    if (errorClosure) errorClosure()
  } finally {
    if (finalClosure) finalClosure()
  }
}
