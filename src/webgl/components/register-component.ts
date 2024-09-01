import { CanvasComponentContext, WebGLLayout } from '@/webgl/types'

type ComponentParams = {
  style: any;
}

type CustomComponent = {
  type: string;
  render: (params: ComponentParams, context: CanvasComponentContext, parentLayout: WebGLLayout) => void;
  clear: (prevParams: ComponentParams, parentLayout: WebGLLayout, context: CanvasComponentContext) => void;
}

export const CustomComponents = new Map<string, CustomComponent>()

function registerComponent(componentName: string, Component: any): string {
  CustomComponents.set(componentName, {
    type: componentName,
    render: (params: ComponentParams, context: CanvasComponentContext, parentLayout: WebGLLayout) => {
      Component.render(params, context, parentLayout);
    },
    clear: (prevParams: ComponentParams, parentLayout: WebGLLayout, context: CanvasComponentContext) => {
      const clearParams = {
        ...prevParams,
        style: {
          ...prevParams.style,
          color: parentLayout.layoutStyle?.backgroundColor,
        },
        isResetPhase: true,
      };

      Component.render(clearParams, context, parentLayout);
    },
  })

  return componentName
}

export default registerComponent
