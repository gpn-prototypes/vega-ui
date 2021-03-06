import React, { useState } from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Combobox } from './Combobox';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getCommonKnobs = () => ({
  placeholder: text('placeholder', 'Выберите город'),
});

storiesOf('ui/Combobox', module)
  .addDecorator(withKnobs)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-combobox--default-story',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    type Option = {
      label: string;
      value: string;
    };

    const items = [
      { label: 'Москва', value: 'moscow' },
      { label: 'Санкт-Петербург', value: 'spb' },
      { label: 'Томск', value: 'tomsk' },
      { label: 'Омск', value: 'omsk' },
      { label: 'Орск', value: 'orsk' },
      { label: 'Тверь', value: 'tver' },
      { label: 'Тула', value: 'tula' },
      { label: 'Тамбов', value: 'tambov' },
      { label: 'Краснодар', value: 'krasnodar' },
      { label: 'Белгород', value: 'belgorod' },
    ];

    const [options, setOptions] = useState(items);
    const [value, setValue] = useState<Option | null | undefined>();

    const getItemLabel = (option: Option): string => option.label;

    const handleCreate = (label: string): void => {
      const newVal: Option = { label, value: label };
      setValue(newVal);
      setOptions([newVal, ...options]);
    };

    return (
      <>
        <div>
          <Combobox
            {...getCommonKnobs()}
            id="city"
            options={options}
            value={value}
            getOptionLabel={getItemLabel}
            onChange={setValue}
            onCreate={handleCreate}
          />
        </div>
      </>
    );
  });
