import type { CanvasComponentContext } from '@/webgl/types'
import { ParentLayout, TextParams } from './types'

function renderText(
  params: TextParams,
  context: CanvasComponentContext,
  parentLayout: ParentLayout,
) {
  const { ctx } = context
  const { spatialGeometry, relativeIndex } = getLayoutInfo(parentLayout)
  const { style, children, content } = params

  if (!spatialGeometry) {
    return null
  }

  const item = content ?? children
  const fontSize = getFontSize(style)
  const fontFamily = getFontFamily(style)
  const x = getX(style, spatialGeometry)
  const y = getY(style, spatialGeometry, fontSize, relativeIndex, parentLayout)
  const originalStrokeStyle = setStrokeStyle(ctx, style);

  ctx.beginPath()
  setStrokeStyle(ctx, style)
  setTextStyle(ctx, style, fontSize, fontFamily)
  setTextAlign(ctx, style)

  ctx.fillText(item, x, y)
  ctx.strokeText(item, x, y)
  ctx.fill()
  ctx.stroke()
  ctx.setLineDash([])
  ctx.closePath()
  restoreStrokeStyle(ctx, originalStrokeStyle)
}

function getLayoutInfo(parentLayout: ParentLayout | undefined) {
  return parentLayout || {} as ParentLayout
}

function getFontSize(style: any) {
  return style.fontSize ?? 18
}

function getFontFamily(style: any) {
  return style.fontFamily ?? 'Roboto'
}

function getX(style: any, spatialGeometry: any) {
  return style.left ?? (spatialGeometry.x || 0)
}

function getY(
  style: any,
  spatialGeometry: any,
  fontSize: number,
  relativeIndex: number | undefined,
  parentLayout: ParentLayout,
) {
  let y = style.top ?? (spatialGeometry.y + fontSize / 2 || fontSize)

  if (!style.position || style.position === 'relative') {
    if (parentLayout.style.lineHeight) {
      y = y + Number(parentLayout.style.lineHeight) * (relativeIndex ?? 1)
    }
  }

  return y
}

function setStrokeStyle(ctx: CanvasRenderingContext2D, style: any) {
  const originalStrokeStyle = ctx.strokeStyle

  ctx.setLineDash(style.borderStyle || [])
  ctx.lineWidth = style.borderSize || 0.2
  ctx.lineJoin = 'round'
  ctx.strokeStyle = style.borderColor ?? 'transparent'

  return originalStrokeStyle
}

function setTextStyle(ctx: CanvasRenderingContext2D, style: any, fontSize: number, fontFamily: string) {
  ctx.font = `${fontSize}px ${fontFamily}`
  ctx.fillStyle = style.color ?? 'black'
}

function setTextAlign(ctx: CanvasRenderingContext2D, style: any) {
  const textAlign = style.align as CanvasTextAlign
  if (textAlign === 'start' || textAlign === 'end' || textAlign === 'left' || textAlign === 'right' || textAlign === 'center') {
    ctx.textAlign = textAlign
  } else {
    console.error(`Invalid text align value: ${style.align}`)
  }
}

function restoreStrokeStyle(ctx: CanvasRenderingContext2D, originalStrokeStyle: string | CanvasGradient | CanvasPattern) {
  ctx.strokeStyle = originalStrokeStyle;
}

function clearText(
  prevParams: TextParams,
  parentLayout: ParentLayout,
  context: CanvasComponentContext
) {
  const clearProps = {
    ...prevParams,
    style: {
      ...prevParams.style,
      color: parentLayout.style.backgroundColor,
      borderColor: parentLayout.style.backgroundColor,
      borderSize: 2.1,
    },
  }

  renderText(clearProps, context, parentLayout)
}

export default function TextComponent(params: TextParams, parentLayout: ParentLayout) {
  const { style } = params

  return {
    type: 'Text',
    render: (context: CanvasComponentContext) => renderText(params, context, parentLayout),
    clear: clearText,
    instructions: {
      relative: style?.position !== 'absolute',
    },
  }
}
