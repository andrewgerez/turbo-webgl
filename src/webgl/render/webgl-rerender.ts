import { ReactNode } from 'react'
import ReactReconciler, { BundleType } from 'react-reconciler'
import { webglComponent } from '../components/webgl-component'
import { scaleDPI } from '../utils/scale-resize'
import { renderElement, renderQueue } from './webgl-render'
import { precacheWebGLNode, updateWebGLProps } from './webgl-tree'
import { WebGLParentInstance, WebGLChild, WebGLElement, CanvasComponentContext } from "@/webgl/types"
import {
  scheduleReconcilerTimeout,
  cancelReconcilerTimeout,
} from './webgl-timeout'

let context: CanvasComponentContext | null = null
let surfaceHeight = 0

const devToolsPreset = {
  bundleType: 0 as BundleType,
  version: '0.1.0',
  rendererPackageName: 'CustomReactReconciler',
}

const CustomRerender = {
  supportsMutation: true,

  createInstance(
    type: any,
    props: any,
    rootContainerInstance: HTMLCanvasElement,
    internalInstanceHandle: any
  ) {
    if (!context && rootContainerInstance.getContext) {
      const rootContainerInstanceContext =
        rootContainerInstance.getContext('2d')

      if (!rootContainerInstanceContext) return

      scaleDPI(rootContainerInstance, rootContainerInstanceContext)

      context = {
        type: 'canvas',
        getSurfaceHeight: () => surfaceHeight,
        setSurfaceHeight: (height: number) => {
          surfaceHeight = height
        },
        ctx: rootContainerInstanceContext,
        renderQueue: [],
      }
    }

    const webglElement = webglComponent.createElement(
      type,
      props,
      context,
    )

    precacheWebGLNode(internalInstanceHandle, webglElement)
    updateWebGLProps(webglElement, props)
    return webglElement
  },

  appendInitialChild(parentInstance: WebGLParentInstance, child: WebGLChild) {
    if (parentInstance.appendChild && child.type !== 'View') {
      let layout = {}
      if (child.instructions?.relative) {
        layout = {
          ...layout,
          ...parentInstance.getAndUpdateCurrentLayout(),
        }
      }
      parentInstance.appendChild({ ...child, layout })

      child.getParentLayout = parentInstance.getLayoutDefinitions
    }
  },

  appendChild(parentInstance: WebGLParentInstance, child: WebGLChild) {
    if (parentInstance.appendChild && child.type !== 'View') {
      parentInstance.appendChild(child)
    }
  },

  finalizeInitialChildren(parentInstance: WebGLParentInstance, type: string) {
    if (type === 'View') {
      parentInstance.render(context)
    }

    return false
  },

  createTextInstance(text: any) {
    return text
  },

  getChildHostContext(parentHostContext: any) {
    return parentHostContext
  },

  removeChildFromContainer(parentInstance: any, child: any) {
    if (child instanceof Node) {
      parentInstance.removeChild(child)
    }
  },

  commitTextUpdate(textInstance: any, oldText: any, newText: any) {
    if (typeof textInstance === 'string') {
      return document.createTextNode(newText)
    } else {
      textInstance.nodeValue = newText
    }
  },

  prepareUpdate(
    element: WebGLElement,
    type: any,
    oldProps: any,
    newProps: any,
  ) {
    if (newProps) {
      const diff = webglComponent.diffProperties(
        oldProps,
        newProps,
      )

      if (diff) {
        const parentLayout = element.parentLayout || element.getParentLayout()
        if (type === 'Text') {
          parentLayout.resetLayout()
        }

        element.clear(oldProps, parentLayout, context)

        const webglElement = webglComponent.createElement(
          type,
          newProps,
          context
        )

        webglElement.parentLayout = parentLayout

        if (diff.length && diff.indexOf('children') === -1) {
          renderElement(context!, webglElement)
          return null
        }

        webglElement?.renderQueue.push(webglElement)

        return null
      }

      if (type === 'Text' && newProps.children?.join) {
        const parentLayout = element.parentLayout || element.getParentLayout()
        element.clear(oldProps, parentLayout, context)

        const webglElement = webglComponent.createElement(
          type,
          { ...newProps, children: newProps.children.join('') },
          context
        )

        renderElement(context, webglElement)
      }
    }
  },

  resetAfterCommit() {
    if (!context) return

    renderQueue(context, () => {
      context?.setSurfaceHeight(0)
    })
  },

  removeChild(parentInstance: WebGLParentInstance, child: WebGLChild) {
    if (child?.type === 'View') {
      child.clear(
        context,
        parentInstance.getLayoutDefinitions()
      )
    }
  },

  shouldSetTextContent(props: any) {
    return (
      typeof props.children === 'string' || typeof props.children === 'number'
    )
  },

  getPublicInstance(inst: any) {
    return inst
  },

  prepareForCommit() {
    return {}
  },

  scheduleTimeout: scheduleReconcilerTimeout,
  cancelTimeout: cancelReconcilerTimeout,
  noTimeout: 0,
  isPrimaryRenderer: true,
  supportsPersistence: true,
  supportsHydration: true,
  getCurrentEventPriority: () => 0,
  getInstanceFromNode: () => undefined,
  getRootHostContext: () => { },
  preparePortalMount: () => { },
  beforeActiveInstanceBlur: () => { },
  afterActiveInstanceBlur: () => { },
  prepareScopeUpdate: () => { },
  getInstanceFromScope: () => { },
  detachDeletedInstance: () => { },
  appendChildToContainer: () => { },
  clearContainer: () => { },
}

const CustomReconciler = ReactReconciler(CustomRerender)

CustomReconciler.injectIntoDevTools({ ...devToolsPreset })

const defaultContainer = {}
const roots = typeof WeakMap === 'function' ? new WeakMap() : new Map()

const WebGLRerender = {
  render(
    webglElement: ReactNode,
    canvasDOMElement: HTMLCanvasElement,
    callback?: any
  ) {
    const containerKey = canvasDOMElement ?? defaultContainer

    let root = roots.get(containerKey)
    if (!root) {
      root = CustomReconciler.createContainer(containerKey)
      roots.set(canvasDOMElement, root)
      context = null
    }

    CustomReconciler.updateContainer(webglElement, root, null, callback)

    return CustomReconciler.getPublicRootInstance(root)
  },
}

export default WebGLRerender
