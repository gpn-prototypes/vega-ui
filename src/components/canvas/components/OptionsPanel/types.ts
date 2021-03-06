import React from 'react';

import { IconProps } from '../../../icons';
import { ItemType } from '../../types';

export type ActiveOption = 'selection' | 'dragging';

export type Option =
  | ActiveOption
  | 'remove'
  | 'grouping'
  | 'create'
  | 'ordering'
  | 'step'
  | 'root'
  | 'end';

export type Changes = { type: Exclude<Option, 'create'> } | { type: 'create'; itemType: ItemType };

export type OptionView<T = Option> = {
  type: T;
  label?: string;
  icon: React.FC<IconProps>;
};
