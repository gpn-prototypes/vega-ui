import React from 'react';
import { Dropdown } from '@gpn-prototypes/vega-dropdown';
import { useToggle } from '@gpn-prototypes/vega-hooks';
import { IconNodeEnd, IconNodeStart, IconNodeStep } from '@gpn-prototypes/vega-icons';
import { NavigationList } from '@gpn-prototypes/vega-navigation-list';
import { usePortal } from '@gpn-prototypes/vega-root';

import { cnCanvas } from '../../../cn-canvas';
import { ItemType } from '../../../types';
import { OptionView } from '../types';

import { Option, OptionProps } from './Option';

type CreateOptionProps = Omit<OptionProps, 'onClick'> & {
  onCreate(type: ItemType): void;
};

export const items: OptionView<ItemType>[] = [
  { type: 'root', icon: IconNodeStart, label: 'Начало' },
  { type: 'step', icon: IconNodeStep, label: 'Выход' },
  { type: 'end', icon: IconNodeEnd, label: 'Шаг' },
];

export const CreateOption = (props: CreateOptionProps): React.ReactElement => {
  const [dropdownOpen, dropdownToggle] = useToggle(false);
  const { portal } = usePortal();

  const handleItemClick = (type: ItemType): void => {
    props.onCreate(type);
    dropdownToggle(false);
  };

  return (
    <Dropdown
      placement="top"
      portal={portal}
      isOpen={dropdownOpen}
      onClickOutside={(): void => dropdownToggle(false)}
      onToggle={dropdownToggle}
    >
      <Dropdown.Trigger>
        {({ toggle, props: { ref } }): React.ReactNode => (
          <Option
            onlyIcon
            role="menuitem"
            isActive={dropdownOpen}
            onClick={toggle}
            innerRef={ref}
            {...props}
          />
        )}
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {({ props: menuProps }): React.ReactNode => {
          return (
            <div role="menu" aria-label="Меню для создания элементов" {...menuProps}>
              <NavigationList className={cnCanvas('CreateOptionsList')}>
                {items.map((item) => {
                  return (
                    <NavigationList.Item key={item.type}>
                      {(): React.ReactNode => (
                        <Option
                          label={item.label}
                          iconSize="xs"
                          role="menuitem"
                          onClick={(): void => handleItemClick(item.type)}
                          option={item}
                          className={cnCanvas('CreateOptionItem').toString()}
                        />
                      )}
                    </NavigationList.Item>
                  );
                })}
              </NavigationList>
            </div>
          );
        }}
      </Dropdown.Menu>
    </Dropdown>
  );
};
