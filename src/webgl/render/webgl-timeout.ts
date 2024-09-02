let scheduledCallback: (() => void) | null = null

function setTimeoutCallback() {
  const callback = scheduledCallback
  scheduledCallback = null
  if (callback !== null) {
    callback()
  }
}

export const scheduleReconcilerTimeout = (
  callback: (...args: unknown[]) => unknown,
) => {
  scheduledCallback = callback
  const timeoutId = setTimeout(setTimeoutCallback, 1)
  return timeoutId
}

export const cancelReconcilerTimeout = (
  timeoutId: number,
) => {
  scheduledCallback = null
  clearTimeout(timeoutId)
}
