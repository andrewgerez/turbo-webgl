import { View, Image, Text } from '@/webgl'
import { ContentType } from '@/components/webgl-home/types'

const ContentCard = (data: ContentType, idx: number) => {
  return (
    <View
      height={200}
      width={200}
      key={'poster-list-' + idx}
    >
      <Image
        style={{ left: 220 * idx + 30, top: 185, width: 200, height: 300 }}
        src={data.src}
      />
      <Text style={{ left: 220 * idx + 70, top: 485, color: '#FFF' }}>
        {data.name}
      </Text>
    </View>
  )
}

export default ContentCard
