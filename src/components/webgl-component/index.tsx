import Carousel from '@/components/webgl-component/carousel'
import { v4 as uuidv4 } from 'uuid'
import { LogoImage } from '@/components/webgl-component/utils'
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

const { width } = Dimensions.get('window') as { width: number; height: number }

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    backgroundColor: '#404040',
    width: width,
    height: 140,
  },
}) as {
  header: HeaderStyle
  title_container: TitleContainerStyle
  title: TitleStyle
  logo_container: LogoContainerStyle
  logo: LogoStyle
}

const WebGLComponent = () => {
  return (
    <View>
      <View styles={styles.header}>
        <Image src={LogoImage} style={{ top: 85, left: 15, width: 170, height: 140 }} />
      </View>

      {Array.from({ length: 2 }).map((_, idx) => (
        <Carousel key={uuidv4()} index={idx} />
      ))}
    </View>
  )
}

const RenderNavigableWebGLComponent = () => NavigableComponent(WebGLComponent)

function WebGLElement(): JSX.Element | null {
  const canvasRoot = document.getElementById('canvas-root')

  if (!(canvasRoot instanceof HTMLCanvasElement)) return null

  return customWebGLRender(<RenderNavigableWebGLComponent />, canvasRoot)
}

export default WebGLElement
