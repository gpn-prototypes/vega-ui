import Konva from 'konva';

import { metrics } from './metrics';
import { RectParams, Size } from './types';

type ViewData = {
  layer: Konva.Layer | null;
  stageSize: Size;
  contentRect: RectParams;
};

export type ScrollbarData = {
  type: 'horizontal' | 'vertical';
  scrollbar: Konva.Rect | null;
};

type getBgRectProps = {
  contentRect: RectParams;
  contentPadding: {
    horizontal: number;
    vertical: number;
  };
  scale?: number;
};

type ScrollbarPointsParams = ViewData & Pick<ScrollbarData, 'scrollbar'>;

type ScrollbarPointsGetter = (data: ScrollbarData) => number;

export const getContentRect = (
  elements: Konva.Node[],
  minWidth: number,
  minHeight: number,
): RectParams => {
  const rect = {
    x: 0,
    y: 0,
    width: minWidth,
    height: minHeight,
  };

  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];

    const elementXO = element.x();
    const elementY0 = element.y();
    const elementX1 = element.x() + element.width();
    const elementY1 = element.y() + element.height();

    /*

    x0, y0 ----- x1, y0
    |                 |
    |                 |
    |                 |
    x0, y1 ----- x1, y1

    */

    const rectX0 = rect.x;
    const rectY0 = rect.y;
    const rectX1 = rect.x + rect.width;
    const rectY1 = rect.y + rect.height;

    if (elementXO < rectX0) {
      rect.x = elementXO;
      rect.width = rectX1 - elementXO;
    }

    if (elementY0 < rectY0) {
      rect.y = elementY0;
      rect.height = rectY1 - elementY0;
    }

    if (elementX1 > rectX1) {
      rect.width = elementX1 - rectX0;
    }

    if (elementY1 > rectY1) {
      rect.height = elementY1 - rectY0;
    }
  }

  return rect;
};

export const getBgRect = (props: getBgRectProps): RectParams => {
  const { contentRect, contentPadding, scale = 1 } = props;
  const { blockSize } = metrics.grid;

  const x0 = contentRect.x - contentPadding.horizontal * (1 / scale);
  const y0 = contentRect.y - contentPadding.vertical * (1 / scale);
  const width = contentRect.width + 2 * contentPadding.horizontal * (1 / scale);
  const height = contentRect.height + 2 * contentPadding.vertical * (1 / scale);
  const x1 = x0 + width;
  const y1 = y0 + height;

  const bgRect = {
    x: x0,
    y: y0,
    width,
    height,
  };

  const intX0 = Math.trunc(x0 / blockSize);
  const intY0 = Math.trunc(y0 / blockSize);
  const intX1 = Math.trunc(x1 / blockSize);
  const intY1 = Math.trunc(y1 / blockSize);

  if (bgRect.x % blockSize < 0) {
    bgRect.x = blockSize * (intX0 - 1);
  }

  if (bgRect.x % blockSize > 0) {
    bgRect.x = blockSize * intX0;
  }

  if (bgRect.y % blockSize < 0) {
    bgRect.y = blockSize * (intY0 - 1);
  }

  if (bgRect.y % blockSize > 0) {
    bgRect.y = blockSize * intY0;
  }

  //

  if (x1 % blockSize < 0) {
    bgRect.width = blockSize * intX1 - bgRect.x;
  }

  if (x1 % blockSize > 0) {
    bgRect.width = blockSize * (intX1 + 1) - bgRect.x;
  }

  if (y1 % blockSize < 0) {
    bgRect.height = blockSize * intY1 - bgRect.y;
  }

  if (y1 % blockSize > 0) {
    bgRect.height = blockSize * (intY1 + 1) - bgRect.y;
  }

  return bgRect;
};

export const getContentPadding = (stageSize: Size): { horizontal: number; vertical: number } => {
  return {
    horizontal: stageSize.width,
    vertical: stageSize.height,
  };
};

const getHorizontalScrollbarX = (params: ScrollbarPointsParams): number => {
  const { layer, stageSize, scrollbar, contentRect } = params;
  const { horizontal: horizontalPadding } = getContentPadding(stageSize);

  if (!layer || !scrollbar) {
    return 0;
  }

  const maxX = -contentRect.x * layer.scaleX() + horizontalPadding;
  const availableWidth =
    contentRect.width * layer.scaleX() + 2 * horizontalPadding - stageSize.width;
  const availableScrollWidth =
    stageSize.width -
    (metrics.scrollbar.horizontal.marginLeft + metrics.scrollbar.horizontal.marginRight) -
    scrollbar.width();

  const hx =
    ((maxX - layer.x()) / availableWidth) * availableScrollWidth +
    metrics.scrollbar.horizontal.marginLeft;

  return hx;
};

const getVerticalScrollbarY = (params: ScrollbarPointsParams): number => {
  const { layer, stageSize, scrollbar, contentRect } = params;
  const { vertical: verticalPadding } = getContentPadding(stageSize);

  if (!layer || !scrollbar) {
    return 0;
  }

  const maxY = -contentRect.y * layer.scaleY() + verticalPadding;
  const availableHeight =
    contentRect.height * layer.scaleY() + 2 * verticalPadding - stageSize.height;
  const availableScrollHeight =
    stageSize.height -
    (metrics.scrollbar.vertical.marginTop + metrics.scrollbar.vertical.marginBottom) -
    scrollbar.height();

  const vy =
    ((maxY - layer.y()) / availableHeight) * availableScrollHeight +
    metrics.scrollbar.vertical.marginTop;

  return vy;
};

export const createScrollbarPointGetter = (params: ViewData): ScrollbarPointsGetter => {
  return (data: ScrollbarData): number => {
    const scrollbarParams = {
      ...params,
      scrollbar: data.scrollbar,
    };

    if (data.type === 'horizontal') {
      return getHorizontalScrollbarX(scrollbarParams);
    }

    if (data.type === 'vertical') {
      return getVerticalScrollbarY(scrollbarParams);
    }

    return 0;
  };
};

export const calcCreatedStepPosition = (
  layer: Konva.Layer | null,
  stageSize: Size,
): { x: number; y: number } => {
  let x = 0;
  let y = 0;

  if (layer) {
    x = (stageSize.width / 2 - layer.x()) * (1 / layer.scaleX());
    y = (stageSize.height / 2 - layer.y()) * (1 / layer.scaleY());
  }

  return { x, y };
};
