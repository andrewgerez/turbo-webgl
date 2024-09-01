import type { CanvasComponentContext, WebGLElement } from '@/webgl/types'

export const renderElement = (
  context: CanvasComponentContext,
  element: WebGLElement
) => {
  element.render(context, element.parentLayout)
}

export const renderQueue = (
  context: CanvasComponentContext,
  onFinish: () => void
) => {
  if (context?.renderQueue.length) {
    const queue = context.renderQueue

    let reqId: number

    const frame = () => {
      if (queue.length) {
        const element = queue.shift()
        element?.render(context, element.parentLayout)

        reqId = requestAnimationFrame(frame)
      } else {
        cancelAnimationFrame(reqId)
        onFinish()
      }
    }

    frame()
  }
}
