import type { SpatialGeometry } from '@/webgl/types'

export type TextParams = {
  style: TextAppearance;
  children: string;
  content?: string;
}

export type TextAppearance = {
  position: string;
  backgroundColor?: string;
  borderStyle?: Array<number>;
  borderSize: number;
  borderColor?: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  align: string;
  lineHeight?: number;
  x: number;
  y: number;
  top?: number;
  left?: number;
}

export type TextRenderAcc = {
  textLinePos: number;
}

export type ParentLayout = {
  style: TextAppearance;
  spatialGeometry: SpatialGeometry;
  renderAcc: TextRenderAcc;
  relativeIndex?: number;
}
