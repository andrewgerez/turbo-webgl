import { ReactNode } from 'react'

export type CustomCanvasRenderingContext2D = CanvasRenderingContext2D & {
  webkitBackingStorePixelRatio?: number;
  mozBackingStorePixelRatio?: number;
  msBackingStorePixelRatio?: number;
  oBackingStorePixelRatio?: number;
  backingStorePixelRatio?: number;
  type?: string;
}

export type CanvasRect = {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export type SpatialGeometry = {
  x: number;
  y: number;
}

export type CanvasComponentContext = {
  renderQueue: Array<WebGLElement>;
  type: 'canvas';
  ctx: CustomCanvasRenderingContext2D;
  getSurfaceHeight(): number;
  setSurfaceHeight(height: number): void;
}

export type WebGLElement = {
  render(context: CanvasComponentContext, layout: WebGLLayout): void;
  clear(oldParams: any, parentLayout: WebGLLayout, context: CanvasComponentContext): void;
  parentLayout: WebGLLayout;
  getParentLayout(): WebGLLayout;
}

export type WebGLLayout = {
  layoutStyle?: {
    width: number;
    height: number;
    backgroundColor: string;
    borderColor: string;
    overflow: string;
  }
  spatialGeometry: SpatialGeometry;
  resetLayout(): void;
}

export type WebGLParentInstance = {
  appendChild(element: ReactNode): void;
  getAndUpdateCurrentLayout(): WebGLLayout;
  getLayoutDefinitions(): WebGLLayout;
  render(context: CanvasRenderingContext2D): void;
}

export type WebGLChild = {
  type: string;
  instructions?: {
    relative: boolean;
  };
  getParentLayout?: () => WebGLLayout;
  clear(context: CanvasRenderingContext2D, layoutDefinitions: WebGLLayout): void;
}

