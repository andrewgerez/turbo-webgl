import Carousel from '@/components/webgl-component/carousel'
import { v4 as uuidv4 } from 'uuid'
import {
  customWebGLRender,
  View,
  NavigableComponent,
} from '@/webgl'
import Sidebar from './sidebar'

const WebGLComponent = () => {
  return (
    <View>
      <Sidebar />
      {Array.from({ length: 2 }).map((_, index) => (
        <Carousel key={uuidv4()} index={index} />
      ))}
    </View>
  )
}

const RenderNavigableWebGLComponent = NavigableComponent(WebGLComponent)

function WebGLElement(): JSX.Element | null {
  const canvasRoot = document.getElementById('canvas-root')

  if (!(canvasRoot instanceof HTMLCanvasElement)) {
    return null
  }

  return customWebGLRender(<RenderNavigableWebGLComponent />, canvasRoot)
}

export default WebGLElement
