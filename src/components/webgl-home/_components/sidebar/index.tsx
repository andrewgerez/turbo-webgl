import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  FocusedComponent
} from '@/webgl'
import { LogoImage } from '@/components/home-webgl/utils'
import { SidebarItemParams } from './types'
import { NavigationOrientation } from '@/webgl/values/enums'

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: '#404040',
    width: 240,
    height: height,
  },
  container: {
    position: 'absolute',
    left: 40,
    borderRadius: 10,
    lineHeight: 40,
    backgroundColor: '#404040'
  },
})

const SidebarItem = ({ focused, topPosition, text }: SidebarItemParams) => {
  return (
    <View style={{ ...styles.container, top: topPosition }}>
      <Text style={{
        color: focused ? '#707070' : 'white',
        fontSize: 24,
        left: 70,
        align: 'start'
      }}>
        {text}
      </Text>
    </View>
  )
}

const FocusableItem = FocusedComponent(SidebarItem)

const Sidebar = () => {
  return (
    <View style={styles.sidebar}>
      <Image src={LogoImage} style={{ top: 60, left: 30, width: 170, height: 140 }} />

      <FocusableItem
        focusKey="sidebar-item-1"
        direction={NavigationOrientation.VERTICAL}
        text="Home"
        topPosition={190}
      />
      <FocusableItem
        focusKey="sidebar-item-2"
        direction={NavigationOrientation.VERTICAL}
        text="Movies"
        topPosition={230}
      />
      <FocusableItem
        focusKey="sidebar-item-3"
        direction={NavigationOrientation.VERTICAL}
        text="Series"
        topPosition={270}
      />
    </View>
  )
}

export default Sidebar
