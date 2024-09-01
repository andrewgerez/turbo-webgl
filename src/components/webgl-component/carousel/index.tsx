import { View, Image, Text, StyleSheet, Dimensions, FocusedComponent } from '@/webgl'
import { contents } from '@/components/webgl-component/utils'
import { ContentType } from '@/components/webgl-component/types'
import { CarouselParams, CarouselStyle, TitleCarouselStyle } from '@/components/webgl-component/carousel/types'
import { v4 as uuidv4 } from 'uuid'

const { width } = Dimensions.get('window') as { width: number; height: number }

const styles = StyleSheet.create({
  carousel: {
    position: 'absolute',
    left: 0,
    backgroundColor: '#404040',
    width: width,
    height: 360,
  },
  title: {
    color: '#FFF',
    fontSize: 20
  }
}) as { carousel: CarouselStyle, title: TitleCarouselStyle }

const ContentComponent = ({ focused, data, idx, carouselPosition = 1 }: any) => {
  return (
    <>
      <Image
        style={{
          left: 220 * idx + 30,
          top: carouselPosition > 1 ? 215 * carouselPosition + 240 : 240 * carouselPosition,
          width: 200,
          height: 300,
          borderColor: focused ? 'blue' : '#FFF'
        }}
        src={data.src}
      />
      <Text
        style={{
          left: 220 * idx + 30,
          top: carouselPosition > 1 ? 515 * carouselPosition + 240 : 515 * carouselPosition,
          color: focused ? 'blue' : '#FFF',
          align: 'start'
        }}
      >
        {data.name}
      </Text>

    </>
  )
}

const FocusedItem = FocusedComponent(ContentComponent)

const Carousel = ({ index }: CarouselParams) => {
  const currentPosition = index + 1
  const carouselTopPosition = currentPosition === 1 ? 200 : 200 * currentPosition + 240

  return (
    <View style={{ ...styles.carousel, top: carouselTopPosition }}>
      <Text style={{ ...styles.title, top: carouselTopPosition, left: 30, align: 'start' }}>Carousel</Text>
      {contents.map((data, idx) => <FocusedItem focusKey={`item-${data.name}-${idx}`} key={`item-${data.name}-${idx}`} />)}
    </View>
  )
}

export default Carousel
