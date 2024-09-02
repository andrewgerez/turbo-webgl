import type { CanvasComponentContext } from '@/webgl/types'
import { ImageComponentParams, ImageStyle, ParentLayout } from './types'

const cache = new Map<string, { element: HTMLImageElement, width: number, height: number }>()

function drawImage(
  ctx: CanvasRenderingContext2D,
  imageElement: any,
  x: number,
  y: number,
  width: number,
  height: number
) {
  ctx.drawImage(imageElement, x, y, width, height)
}

function getDimensions(params: ImageComponentParams, parentLayout: ParentLayout): { width: number; height: number } {
  const { style = {} as ImageStyle } = params

  let w = style.width
  let h = style.height

  if (parentLayout?.style && parentLayout.style?.overflow === 'hidden') {
    h = parentLayout.style.height
    w = parentLayout.style.width
  }

  return { width: w ?? 0, height: h ?? 0 }
}

function getCoordinates(params: ImageComponentParams, parentLayout: ParentLayout): { x: number; y: number } {
  const { style } = params
  const { spatialGeometry = { x: 0, y: 0 } } = parentLayout || {}

  let x = 'left' in style ? style.left ?? spatialGeometry.x : spatialGeometry.x
  let y = 'top' in style ? style.top ?? spatialGeometry.y : spatialGeometry.y

  if ('position' in style && style.position === 'absolute') {
    x = 'left' in style ? style.left ?? 0 : 0
    y = 'top' in style ? style.top ?? 0 : 0
  }

  return { x, y }
}

function drawImageFromElement(
  ctx: CanvasRenderingContext2D,
  imageElement: any,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  ctx.drawImage(imageElement, x, y, width, height)
}

function drawImageFromCache(
  ctx: CanvasRenderingContext2D,
  cachedImage: { element: any; width: number; height: number },
  x: number,
  y: number,
  width: number,
  height: number
): void {
  drawImageFromElement(ctx, cachedImage.element, x, y, width ?? cachedImage.width, height ?? cachedImage.height)
}

async function loadImage(src: string, ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const imageElement = new Image()
  imageElement.src = src

  try {
    await new Promise((resolve, reject) => {
      imageElement.addEventListener('load', resolve)
      imageElement.addEventListener('error', reject)
    })

    const imageWidth = Number(w || imageElement.naturalWidth)
    const imageHeight = Number(h || imageElement.naturalHeight)

    requestAnimationFrame(() => {
      drawImage(ctx, imageElement, x, y, imageWidth, imageHeight)
    })

    cache.set(src, { element: imageElement, width: imageWidth, height: imageHeight })
  } catch (err) {
    console.error('Failed to load image', err)
  }
}

function renderImage(params: ImageComponentParams, context: CanvasComponentContext, parentLayout: ParentLayout) {
  const { ctx } = context
  const { src, imageElement, style } = params
  const dimensions = getDimensions(params, parentLayout)
  const coordinates = getCoordinates(params, parentLayout)

  if (!src && !imageElement) return null

  if (style.gradient) {
    let gradient

    if (style.gradient.type === 'linear') {
      const startX = style.gradient.start?.x || 0
      const startY = style.gradient.start?.y || 0
      const endX = style.gradient.end?.x || dimensions.width
      const endY = style.gradient.end?.y || dimensions.height
      gradient = ctx.createLinearGradient(startX, startY, endX, endY)
    } else if (style.gradient.type === 'radial') {
      const startX = style.gradient.start?.x || dimensions.width / 2
      const startY = style.gradient.start?.y || dimensions.height / 2
      const endX = style.gradient.end?.x || dimensions.width / 2
      const endY = style.gradient.end?.y || dimensions.height / 2
      gradient = ctx.createRadialGradient(startX, startY, 0, endX, endY, Math.max(dimensions.width, dimensions.height) / 2)
    }

    style.gradient.colors.forEach(colorStop => {
      gradient.addColorStop(colorStop.offset, colorStop.color)
    })

    ctx.fillStyle = gradient
    ctx.fillRect(coordinates.x, coordinates.y, dimensions.width, dimensions.height)
  }

  if (style.borderColor) {
    if (style.borderColor === 'transparent') {
      ctx.clearRect(coordinates.x - 2, coordinates.y - 2, dimensions.width + 4, dimensions.height + 4)
    } else {
      ctx.strokeStyle = style.borderColor
      ctx.lineWidth = 4
      ctx.strokeRect(coordinates.x, coordinates.y, dimensions.width, dimensions.height)
    }
  }

  const cachedImage = cache.get(src)

  if (cachedImage) {
    drawImageFromCache(ctx, cachedImage, coordinates.x, coordinates.y, dimensions.width, dimensions.height)
    return null
  }

  loadImage(
    src,
    ctx,
    coordinates.x,
    coordinates.y,
    dimensions.width || imageElement.naturalWidth,
    dimensions.height || imageElement.naturalHeight
  )
}

export default function ImageComponent(params: ImageComponentParams, parentLayout: ParentLayout) {
  return {
    type: 'Image',
    render: (context: CanvasComponentContext) => renderImage(params, context, parentLayout),
    clear: () => { }
  }
}
