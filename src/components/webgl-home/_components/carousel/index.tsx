import { View, Image, Text, StyleSheet, Dimensions, FocusedComponent } from '@/webgl'
import { contents } from '@/components/webgl-home/utils'
import { CarouselParams, CarouselStyle, TitleCarouselStyle } from '@/components/webgl-home/_components/carousel/types'
import { NavigationOrientation } from '@/webgl/values/enums'

const { width } = Dimensions.get('window') as { width: number; height: number }

const styles = StyleSheet.create({
  carousel: {
    position: 'absolute',
    backgroundColor: '#404040',
    width: width,
    height: 390,
  },
  title: {
    color: '#FFF',
    fontSize: 20
  }
}) as { carousel: CarouselStyle, title: TitleCarouselStyle }

const ContentComponent = ({ focused, image, index, carouselPosition }: any) => {
  return (
    <Image
      style={{
        left: 310 + 220 * index + 30,
        top: carouselPosition === 1 ? 640 : 640 * carouselPosition + 290,
        width: 200,
        height: 300,
        borderColor: focused ? 'orangered' : 'transparent'
      }}
      src={image}
    />
  )
}

const FocusableItem = FocusedComponent(ContentComponent)

const Carousel = ({ index }: CarouselParams) => {
  const currentPosition = index + 1
  const carouselTopPosition = currentPosition === 1 ? 580 : 630 * currentPosition + 240

  return (
    <View style={{ ...styles.carousel, top: carouselTopPosition, left: 300 }}>
      <Text style={{ ...styles.title, top: carouselTopPosition + 7, left: 330, align: 'start' }}>Most Watched Carousel</Text>
      {contents.map((data, idx) => (
        <FocusableItem
          key={`item-${data.name}-${currentPosition}-${idx}`}
          focusKey={`item-${data.name}-${currentPosition}-${idx}`}
          direction={NavigationOrientation.HORIZONTAL}
          image={data.src}
          index={idx}
          carouselPosition={currentPosition}
        />
      ))}
    </View>
  )
}

export default Carousel
