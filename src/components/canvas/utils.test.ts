import Konva from 'konva';

import { calcCreatedStepPosition } from './utils';

describe('Canvas utils', () => {
  describe('calcCreatedStepPosition function', () => {
    test('При layer = null возвращает точку {x: 0, y: 0}', () => {
      const point = calcCreatedStepPosition(null, { width: 100, height: 100 });
      const expectedPoint = { x: 0, y: 0 };
      expect(point).toEqual(expectedPoint);
    });

    test('Возвращает корректную точку создания шага при стандартном scale', () => {
      const point = calcCreatedStepPosition(
        new Konva.Layer({ x: -426, y: -825, scaleX: 1, scaleY: 1 }),
        { width: 855, height: 800 },
      );
      const expectedPoint = { x: 853.5, y: 1225 };
      expect(point).toEqual(expectedPoint);
    });

    test('Возвращает корректную точку создания шага при измененном scale', () => {
      const point = calcCreatedStepPosition(
        new Konva.Layer({ x: -256, y: -580, scaleX: 0.5, scaleY: 0.5 }),
        { width: 855, height: 800 },
      );
      const expectedPoint = { x: 1367, y: 1960 };
      expect(point).toEqual(expectedPoint);
    });
  });
});
