import { CanvasComponentContext, WebGLLayout } from '@/webgl/types'
import { ViewLayout, ViewParams, ViewRenderQueueItem, ViewSpatialGeometry } from './types'

const VIEW_SIZE = 200
const VIEW_LINE_HEIGHT = 24

class View {
  props: ViewParams;
  type: string;
  spatialGeometry: ViewSpatialGeometry;
  layout: ViewLayout;
  renderQueue: ViewRenderQueueItem[];
  previousRect: any;

  constructor(props: ViewParams) {
    this.props = props;
    this.type = 'View';
    this.spatialGeometry = { x: 0, y: 0 };
    this.layout = {
      relativeIndex: 1,
    };
    this.renderQueue = [];
    this.previousRect = null;
  }

  appendChild(fn: ViewRenderQueueItem) {
    this.renderQueue.push(fn)
  }

  getAndUpdateCurrentLayout = () => {
    const currentRelativeIndex = this.layout.relativeIndex

    this.layout = {
      relativeIndex: this.layout.relativeIndex + 1,
    }

    return {
      relativeIndex: currentRelativeIndex,
    }
  }

  resetLayout = () => {
    this.layout = {
      relativeIndex: 0,
    }
  }

  getLayoutDefinitions = () => {
    const resetLayout = this.resetLayout

    return {
      style: {
        backgroundColor: 'white',
        borderColor: 'white',
        lineHeight: VIEW_LINE_HEIGHT,
        ...(this.props.style || {}),
      },
      spatialGeometry: this.spatialGeometry,
      resetLayout,
    }
  }

  children() {
    return this.renderQueue
  }

  clear(context: CanvasComponentContext, parentLayout: WebGLLayout) {
    const { ctx } = context
    const { layoutStyle } = parentLayout

    if (this.previousRect) {
      ctx.beginPath()
      const { x, y, width, height, cornerRadius } = this.previousRect
      ctx.moveTo(x, y)
      ctx.lineTo(x + width - cornerRadius, y)
      ctx.quadraticCurveTo(x + width, y, x + width, y + cornerRadius)
      ctx.lineTo(x + width, y + height - cornerRadius)
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - cornerRadius,
        y + height
      )
      ctx.lineTo(x + cornerRadius, y + height)
      ctx.quadraticCurveTo(x, y + height, x, y + height - cornerRadius)
      ctx.lineTo(x, y + cornerRadius)
      ctx.quadraticCurveTo(x, y, x + cornerRadius, y)
      ctx.strokeStyle = layoutStyle?.backgroundColor ?? 'transparent'
      ctx.fillStyle = layoutStyle?.backgroundColor ?? 'transparent'
      ctx.fill()
      ctx.stroke()
      ctx.closePath()
    }
  }

  render(context: CanvasComponentContext) {
    const { ctx, getSurfaceHeight, setSurfaceHeight } = context
    const { style } = this.props

    const previousStroke = ctx.strokeStyle
    const x = style?.x ?? (style?.left ?? 0)
    let y = style?.y ?? (style?.top ?? 0)
    const width = style?.width ?? VIEW_SIZE
    const height = style?.height ?? VIEW_SIZE

    const cornerRadius = style?.borderRadius ?? 0
    const doesNotHavePosition = !style?.position
    const isPositionRelative = style?.position === 'relative'

    if (doesNotHavePosition || isPositionRelative) {
      const surfaceHeight = getSurfaceHeight()
      y = surfaceHeight
      setSurfaceHeight(surfaceHeight + height)
    }

    ctx.globalCompositeOperation = 'destination-over'
    ctx.beginPath()

    ctx.moveTo(x, y)
    ctx.lineTo(x + width - cornerRadius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + cornerRadius)
    ctx.lineTo(x + width, y + height - cornerRadius)
    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - cornerRadius,
      y + height
    )
    ctx.lineTo(x + cornerRadius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - cornerRadius)
    ctx.lineTo(x, y + cornerRadius)
    ctx.quadraticCurveTo(x, y, x + cornerRadius, y)

    this.previousRect = { x, y, width, height, cornerRadius }
    ctx.strokeStyle = style?.borderColor ?? 'transparent'
    ctx.fillStyle = style?.backgroundColor ?? 'transparent'
    ctx.fill()
    ctx.stroke()
    ctx.closePath()

    ctx.globalCompositeOperation = 'source-over'
    ctx.strokeStyle = previousStroke

    this.spatialGeometry = { x, y }


    const callRenderFunctions = (renderFunction: ViewRenderQueueItem) => {
      renderFunction.render?.(context, {
        ...this.getLayoutDefinitions(),
        ...renderFunction.layout,
      })
    }

    this.renderQueue.forEach(callRenderFunctions)
  }
}

export default View
