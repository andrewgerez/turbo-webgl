import { SpatialGeometry } from '@/webgl/types'

export type ImageStyle = {
  width?: number;
  height?: number;
  x: number;
  y: number;
  left?: number;
  top?: number;
  overflow?: string;
  borderColor?: string;
}

export type ImageComponentParams = {
  style: ImageStyle;
  src: string;
  imageElement: HTMLImageElement;
  width?: number;
  height?: number;
}

export type ParentLayout = {
  style: ImageStyle;
  spatialGeometry: SpatialGeometry;
}
