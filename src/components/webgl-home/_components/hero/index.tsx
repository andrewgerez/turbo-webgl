import { View, Image } from "@/webgl"
import { HeroBannerImage } from "../../utils"

function Hero() {
  return (
    <View>
      <Image
        id='hero-banner'
        style={{
          left: 240,
          top: 0,
          width: 1920,
          height: 560,
          zIndex: 0,
          gradient: {
            type: 'linear',
            colors: [
              { offset: 0, color: 'rgba(0, 0, 0, 0.5)' },
              { offset: 0.5, color: 'rgba(0, 0, 0, 0)' },
              { offset: 1, color: 'rgba(0, 0, 0, 0.5)' }
            ],
            start: { x: 0, y: 0 },
            end: { x: 1920, y: 560 }
          }
        }}
        src={HeroBannerImage}
      />
    </View>
  )
}

export default Hero
