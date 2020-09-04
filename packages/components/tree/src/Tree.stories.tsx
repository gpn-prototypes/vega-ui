import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Tree } from './Tree';
import { RootProps } from './types';

const OrangeLineSvg = (
  <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 3.5C0 3.5 3.5 0.5 7.5 0.5C11.5 0.5 12 3.5 12 3.5" stroke="#F38B00" />
    <path
      d="M4.5 3.5C0.5 3.5 0 6.5 0 6.5V8.5C1.5 7.66667 3.5 6 7 6C9.5 6 11.1667 7.66667 12 8.5V6.5C12 6.5 8.5 3.5 4.5 3.5Z"
      fill="white"
      fillOpacity="0.2"
    />
    <path d="M0 10.5C0 10.5 1.5 9.5 5.5 9.5C9.5 9.5 12 10.5 12 10.5" stroke="#F38B00" />
  </svg>
);

const BlueLineSvg = (
  <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 3.5C0 3.5 3.5 0.5 7.5 0.5C11.5 0.5 12 3.5 12 3.5"
      stroke="white"
      strokeOpacity="0.2"
    />
    <path
      d="M4.5 3.5C0.5 3.5 0 6.5 0 6.5V8.5C1.5 7.66667 3.5 6 7 6C9.5 6 11.1667 7.66667 12 8.5V6.5C12 6.5 8.5 3.5 4.5 3.5Z"
      fill="#0AA5FF"
    />
    <path
      d="M0 10.5C0 10.5 1.5 9.5 5.5 9.5C9.5 9.5 12 10.5 12 10.5"
      stroke="white"
      strokeOpacity="0.2"
    />
  </svg>
);

const RedLineSvg = (
  <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.5 3.50012C0.5 3.50012 0 6.50012 0 6.50012V3.50012C2 2.33346 5.29928 -0.140019 8.5 0.500124C10.5 0.900124 11.6667 2.33346 12 3.00012V6.50012C12 6.50012 8.5 3.50012 4.5 3.50012Z"
      fill="#FE4343"
    />
    <path
      d="M0 3.5C0 3.5 3.5 0.5 7.5 0.5C11.5 0.5 12 3.5 12 3.5"
      stroke="white"
      strokeOpacity="0.2"
    />
    <path
      d="M4.5 3.5C0.5 3.5 0 6.5 0 6.5V8.5C1.5 7.66667 3.5 6 7 6C9.5 6 11.1667 7.66667 12 8.5V6.5C12 6.5 8.5 3.5 4.5 3.5Z"
      fill="white"
      fillOpacity="0.2"
    />
    <path
      d="M0 10.5C0 10.5 1.5 9.5 5.5 9.5C9.5 9.5 12 10.5 12 10.5"
      stroke="white"
      strokeOpacity="0.2"
    />
  </svg>
);

const rootProps: RootProps = [
  {
    name: 'Усть-Енисей',
    isDraggable: false,
    iconId: 'blue-line',
    nodeList: [
      {
        name: 'Поднятие 44-23',
        iconId: 'orange-line',
        isDraggable: false,
        nodeList: [
          {
            name: 'Залежь - 78',
            iconId: 'blue-line',
            nodeList: [
              {
                name: 'Ловушка 100',
                iconId: 'red-line',
                nodeList: [
                  {
                    name: 'Еще что нибудь',
                  },
                ],
              },
            ],
          },
          {
            name: 'Залежь - 79',
            iconId: 'blue-line',
            nodeList: [
              {
                name: 'Ловушка 101',
                iconId: 'red-line',
              },
            ],
          },
          {
            name: 'Залежь - 56',
            iconId: 'blue-line',
          },
          {
            name: 'Залежь - 11',
            iconId: 'blue-line',
          },
          {
            name: 'Залежь - 1',
            iconId: 'blue-line',
          },
        ],
      },
      {
        name: 'Поднятие 55-100',
        iconId: 'orange-line',
        isDraggable: false,
        nodeList: [
          {
            name: 'Залежь - 78',
            iconId: 'blue-line',
          },
          {
            name: 'Залежь - 79',
            iconId: 'blue-line',
          },
          {
            name: 'Залежь - 56',
            iconId: 'blue-line',
          },
          {
            name: 'Залежь - 11',
            iconId: 'blue-line',
          },
          {
            name: 'Залежь - 1',
            iconId: 'blue-line',
          },
        ],
      },
      {
        name: 'Поднятие 23-32',
        iconId: 'orange-line',
        isDraggable: false,
        nodeList: [
          {
            name: 'Залежь - 44',
            iconId: 'blue-line',
          },
          {
            name: 'Залежь - 79',
            iconId: 'blue-line',
          },
          {
            name: 'Залежь - 45',
            iconId: 'blue-line',
          },
          {
            name: 'Залежь - 46',
            iconId: 'blue-line',
            nodeList: [
              {
                name: 'Ловушка - 1',
                iconId: 'red-line',
                nodeList: [
                  {
                    name: 'Данные по Ловушка - 1',
                  },
                ],
              },
              {
                name: 'Ловушка - 2',
                iconId: 'red-line',
              },
              {
                name: 'Ловушка - 3',
                iconId: 'red-line',
              },
              {
                name: 'Ловушка - 4',
                iconId: 'red-line',
              },
              {
                name: 'Ловушка - 5',
                iconId: 'red-line',
              },
            ],
          },
          {
            name: 'Залежь - 1',
            iconId: 'blue-line',
          },
        ],
      },
    ],
  },
];

const icons = {
  'blue-line': BlueLineSvg,
  'orange-line': OrangeLineSvg,
  'red-line': RedLineSvg,
};

storiesOf('ui/Tree', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'Ланит', status: 'Draft' } })
  .add('по умолчанию', () => (
    <Tree
      icons={icons}
      nodeList={rootProps}
      onRenameItem={(): void => action('Renamed')('Item')}
      onCopyItem={(): void => action('Copied')('Item')}
      onDeleteItem={(): void => action('Deleted')('Item')}
      onPasteItem={(): void => action('Inserted')('Item')}
    />
  ));
