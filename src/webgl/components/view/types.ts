export type ViewParams = {
  style?: {
    position?: string;
    x?: number;
    y?: number;
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    borderRadius?: number;
    backgroundColor?: string;
    borderColor?: string;
  };
}

export type ViewLayout = {
  relativeIndex: number;
}

export type ViewSpatialGeometry = {
  x: number;
  y: number;
}

export type ViewRenderQueueItem = {
  render?: (context: any, layout: any) => void;
  layout?: any;
}

export type ViewContext = {
  ctx: any;
  getSurfaceHeight: () => number;
  setSurfaceHeight: (height: number) => void;
}
