import RenderFocusedComponent from '@/webgl/navigation/render-focused-component'
import { View, Image, Text, StyleSheet, Dimensions } from '@/webgl'
import { contents } from '@/components/webgl-component/utils'
import { ContentType } from '@/components/webgl-component/types'
import { CarouselParams, CarouselStyle, TitleCarouselStyle } from '@/components/webgl-component/carousel/types'

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

const renderContent = (data: ContentType, idx: number, carouselPosition: number) => {
  return (
    <RenderFocusedComponent
      key={`card_${idx}_${carouselPosition}`}
      CustomComponent={ContentComponent}
      focusKey={`card_${idx}`}
      data={data}
      idx={idx}
      carouselPosition={carouselPosition}
    />
  )
}

const ContentComponent = ({ focused, data, idx, carouselPosition }: any) => {
  return (
    <>
      <Image
        style={{
          left: 220 * idx + 30,
          top: carouselPosition > 1 ? 215 * carouselPosition + 240 : 240 * carouselPosition,
          width: 200,
          height: 300
        }}
        src={data.src}
      />
      <Text
        style={{
          left: 220 * idx + 30,
          top: carouselPosition > 1 ? 515 * carouselPosition + 240 : 515 * carouselPosition,
          color: focused ? 'blue' : '#FFF'
        }}
      >
        {data.name}
      </Text>
    </>
  )
}

const Carousel = ({ index }: CarouselParams) => {
  const currentPosition = index + 1
  const carouselTopPosition = currentPosition === 1 ? 200 : 200 * currentPosition + 240

  return (
    <View style={{ ...styles.carousel, top: carouselTopPosition }}>
      <Text style={{ ...styles.title, top: carouselTopPosition, left: 30 }}>Carousel</Text>
      {contents.map((data, idx) => renderContent(data, idx, currentPosition))}
    </View>
  )
}

export default Carousel
