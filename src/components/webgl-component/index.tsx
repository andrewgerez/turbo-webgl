import Carousel from '@/components/webgl-component/carousel'
import { v4 as uuidv4 } from 'uuid'
import { HeaderStyle, LogoContainerStyle, LogoStyle, TitleContainerStyle, TitleStyle } from '@/components/webgl-component/types'
import {
  customWebGLRender,
  Dimensions,
  View,
  Image,
  Text,
  StyleSheet,
  NavigableComponent,
} from '@/webgl'
import Sidebar from './sidebar'

const { width } = Dimensions.get('window') as { width: number; height: number }

const WebGLComponent = () => {
  return (
    <View>
      {/* {Array.from({ length: 2 }).map((_, idx) => (
        <Carousel key={uuidv4()} index={idx} />
      ))} */}
      <Sidebar />
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
