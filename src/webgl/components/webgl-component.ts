import Image from './image'
import Text from './text'
import View from './view'
import { CustomComponents } from './register-component'
import { ComponentTypeEnum } from '../values/enums'
import { CanvasComponentContext } from '@/webgl/types'

export const webglComponent = {
  createElement(
    type: string,
    params: any,
    context: CanvasComponentContext,
  ) {
    const customDict: { [key: string]: string } = {}
    Object.keys(CustomComponents).forEach((customKey) => {
      const customComponent = CustomComponents.get(customKey)

      if (customComponent) {
        customComponent.render(params, context, params.parentLayout)
      }
    })

    const COMPONENTS = {
      ...customDict,
      Image: Image(params, params.parentLayout),
      Text: Text(params, params.parentLayout),
      View: new View(params),
    }

    if (!(type in COMPONENTS)) {
      throw new Error(`Component type isn't valid.`)
    }

    return (COMPONENTS as Record<string, any>)[type]
  },

  createTextNode(text: string) {
    return text
  },

  diffProperties(lastRawProps: any, nextRawProps: any) {
    const lastProps = lastRawProps
    const nextProps = nextRawProps
    const updatePayload: any[] = []

    const diffProp = (propKey: string, lastProp: any, nextProp: any) => {
      if (propKey === ComponentTypeEnum.STYLE) {
        const styleUpdates = this.diffStyleProperties(lastProp, nextProp)
        if (styleUpdates) {
          updatePayload.push(ComponentTypeEnum.STYLE, styleUpdates)
        }
      } else if (propKey === ComponentTypeEnum.CHILDREN) {
        if (lastProp !== nextProp && (typeof nextProp === 'string' || typeof nextProp === 'number')) {
          updatePayload.push(propKey, nextProp)
        }
      } else if (lastProp !== nextProp) {
        updatePayload.push(propKey, nextProp)
      }
    }

    Object.keys(lastProps).forEach((propKey) => {
      if (lastProps[propKey] != null && !(propKey in nextProps)) {
        diffProp(propKey, lastProps[propKey], null)
      }
    })

    Object.keys(nextProps).forEach((propKey) => {
      const lastProp = lastProps != null ? lastProps[propKey] : undefined
      const nextProp = nextProps[propKey]
      if (lastProp !== nextProp && !(nextProp == null && lastProp == null)) {
        diffProp(propKey, lastProp, nextProp)
      }
    })

    return updatePayload.length > 0 ? updatePayload : null
  },

  diffStyleProperties(
    lastStyle: any,
    nextStyle: any,
  ) {
    let styleUpdates: any = null
    let styleName

    for (styleName in lastStyle) {
      if (lastStyle.hasOwn(styleName)) {
        if (!nextStyle?.hasOwn(styleName)) {
          styleUpdates = styleUpdates || {}
          styleUpdates[styleName] = ''
        }
      }
    }
    for (styleName in nextStyle) {
      if (
        nextStyle.hasOwn(styleName) &&
        lastStyle[styleName] !== nextStyle[styleName]
      ) {
        styleUpdates = styleUpdates || {}
        styleUpdates[styleName] = nextStyle[styleName]
      }
    }

    return styleUpdates
  },
}
