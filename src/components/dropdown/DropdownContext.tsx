import React, { useContext } from 'react';

export interface DropdownContextValue {
  portal?: HTMLDivElement | null;
  isOpen: boolean;
  onlyOpen: boolean;
  toggle(event: React.SyntheticEvent): void;
  clickOutside(): void;
  triggerProps: {
    triggerElement: HTMLElement | null;
    setTriggerElement: (ref: HTMLElement | null) => void;
  };
  menuProps: {
    menuElement: HTMLElement | null;
    setMenuElement: (ref: HTMLElement | null) => void;
    style: React.CSSProperties;
    attributes: { [key: string]: string } | undefined;
  };
}

/* istanbul ignore next */
const noop = (): void => {};

export const DropdownContext = React.createContext<DropdownContextValue>({
  onlyOpen: true,
  isOpen: false,
  portal: undefined,
  toggle: noop,
  clickOutside: noop,
  triggerProps: {
    triggerElement: null,
    setTriggerElement: noop,
  },
  menuProps: {
    menuElement: null,
    setMenuElement: noop,
    style: {},
    attributes: {},
  },
});

export function useDropdown(): DropdownContextValue {
  return useContext(DropdownContext);
}
