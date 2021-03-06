import React from 'react';

import { useToggle } from '../../../hooks';
import { Dropdown, DropdownPlacement, DropdownTriggerChildrenProps } from '../../dropdown';
import { usePortal } from '../../root';
import { cnLayout } from '../cn-layout';

type LayoutDropdownProps = {
  placement: DropdownPlacement;
  trigger: (props: DropdownTriggerChildrenProps & { isOpen: boolean }) => React.ReactNode;
  menu: (props: { closeDropdown: () => void }) => React.ReactNode;
};

export const LayoutDropdown: React.FC<LayoutDropdownProps> = (props) => {
  const { placement, trigger, menu } = props;

  const [state, toggle] = useToggle();

  const { portal } = usePortal();

  return (
    <Dropdown
      placement={placement}
      portal={portal}
      isOpen={state}
      onClickOutside={(): void => toggle(false)}
      onToggle={toggle}
    >
      <Dropdown.Trigger>
        {(triggerProps): React.ReactNode => trigger({ ...triggerProps, isOpen: state })}
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {({ props: menuProps }): React.ReactNode => (
          <div className={cnLayout('MenuWrapper')} {...menuProps}>
            {menu({ closeDropdown: () => toggle(false) })}
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};
