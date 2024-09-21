import { v4 as uuidv4 } from 'uuid'
import {
  customWebGLRender,
  View,
  NavigableComponent,
} from '@/webgl'
import Sidebar from './_components/sidebar'
import Hero from './_components/hero'
import Carousel from './_components/carousel'

const WebGLComponent = () => {
  return (
    <View>
      <Hero />
      <Sidebar />
      {Array.from({ length: 1 }).map((_, index) => (
        <Carousel key={uuidv4()} index={index} />
      ))}
    </View>
  )
}

const RenderNavigableWebGLComponent = NavigableComponent(WebGLComponent)

function WebGLHome(): JSX.Element | null {
  const canvasRoot = document.getElementById('canvas-root')

  if (!(canvasRoot instanceof HTMLCanvasElement)) {
    return null
  }

  return customWebGLRender(<RenderNavigableWebGLComponent />, canvasRoot)
}

export default WebGLHome
