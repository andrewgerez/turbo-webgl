// @: Components
// =============================================
import RegisterComponent from './components/register-component'
import ListViewComponent from './components/list-view'

// @: Services
// =============================================
import StyleSheetService from './stylization'
import DimensionsService from './utils/dimensions'

// @: Render
// =============================================
import WebGLRerender from './render/webgl-rerender'
import renderFocusedElement from './navigation/render-focused-component'
import renderParentWithNavigationPath from './navigation/render-navigable-component'

// @: Exports
// =============================================
export const registerComponent = RegisterComponent
export const customWebGL = WebGLRerender
export const customWebGLRender = WebGLRerender.render

export const Image: React.ReactNode = 'Image'
export const View: React.ReactNode = 'View'
export const ListView = ListViewComponent
export const Text: React.ReactNode = 'Text'

export const StyleSheet = StyleSheetService
export const Dimensions = DimensionsService
export const FocusedComponent = renderFocusedElement
export const NavigableComponent = renderParentWithNavigationPath
