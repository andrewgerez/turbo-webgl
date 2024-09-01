declare module '@/webgl' {
  export const customWebGLRender: (node: any, root: HTMLCanvasElement) => JSX.Element
  export const NavigableComponent: (node: any) => any
  export const FocusedComponent: (node: any) => any
  export const View: React.ComponentType<any>
  export const Image: React.ComponentType<any>
  export const Text: React.ComponentType<any>
  export const Dimensions: any
  export const StyleSheet: any
}
