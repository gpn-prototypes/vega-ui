import React from 'react';
import { Rect } from 'react-konva';
import Konva from 'konva';

import { useImage } from '../../hooks';
import { RectParams } from '../../types';

import grid from './Grid.svg';

type CanvasGridProps = {
  innerRef: React.RefObject<Konva.Rect>;
  rect: RectParams;
};

export const CanvasGrid: React.FC<CanvasGridProps> = (props) => {
  const { innerRef, rect } = props;
  const [image] = useImage(grid);

  return <Rect ref={innerRef} {...rect} fillPatternImage={image} listening={false} />;
};
