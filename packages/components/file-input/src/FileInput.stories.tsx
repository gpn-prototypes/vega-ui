import React from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { IconAttach } from '@gpn-prototypes/vega-icons';
import { Text } from '@gpn-prototypes/vega-text';
import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { FileInput, FileInputProps } from './FileInput';

const defaultKnobs = (): FileInputProps => ({
  id: text('id', 'id'),
});

storiesOf('ui/FileInput', module)
  .addDecorator(withKnobs)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-filefield--playground',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    const buttonProps: React.ComponentProps<typeof Button> = {
      iconLeft: IconAttach,
      iconSize: 'xs',
      label: text('title', 'Title'),
    };
    return (
      <FileInput {...defaultKnobs()} accept="image/png" onChange={action('Файлы выбраны')}>
        {(props): React.ReactNode => <Button {...props} {...buttonProps} />}
      </FileInput>
    );
  })
  .add('без рендер пропа', () => {
    return (
      <FileInput {...defaultKnobs()} onChange={action('Файлы выбраны')}>
        <Text>Нажми на меня</Text>
      </FileInput>
    );
  });
