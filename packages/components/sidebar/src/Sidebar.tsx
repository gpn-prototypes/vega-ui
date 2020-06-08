import React from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { useKey, usePortalDomNode } from '@gpn-prototypes/vega-hooks';

import { cnSidebar } from './cn-sidebar';
import { SidebarBody } from './SidebarBody';
import { SidebarFooter } from './SidebarFooter';
import { SidebarHeader } from './SidebarHeader';

import './Sidebar.css';

export type SidebarProps = {
  isOpen?: boolean;
  align?: 'left' | 'right';
  hasOverlay?: boolean;
  onOverlayClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent) => void;
  portalContainerSelector?: string;
  isMinimized?: boolean;
  className?: string;
};

export type Sidebar<T> = React.FC<T> & {
  Header: typeof SidebarHeader;
  Body: typeof SidebarBody;
  Footer: typeof SidebarFooter;
};

const cssTransitionClasses = {
  enter: 'is-enter',
  enterActive: 'is-enter-active',
  exit: 'is-exit',
  exitActive: 'is-exit-active',
};

export const Sidebar: Sidebar<SidebarProps> = ({
  isOpen = false,
  align = 'right',
  hasOverlay = true,
  onOverlayClick,
  portalContainerSelector,
  isMinimized = false,
  className,
  children,
  ...rest
}) => {
  const showOverlay = isOpen && hasOverlay && !isMinimized;

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent,
  ): void => {
    if (onOverlayClick) {
      onOverlayClick(event);
    }
  };

  useKey('Escape', handleOverlayClick);

  const Content = (
    <>
      <CSSTransition
        in={isOpen}
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames={cssTransitionClasses}
      >
        <aside
          aria-label="Сайдбар"
          className={cnSidebar({ align, minimized: isMinimized }).mix(className)}
          {...rest}
        >
          {children}
        </aside>
      </CSSTransition>
      {showOverlay && (
        <button
          type="button"
          aria-label="Оверлей"
          onClick={handleOverlayClick}
          className={cnSidebar('Overlay')}
        />
      )}
    </>
  );

  const container = usePortalDomNode(portalContainerSelector);

  if (portalContainerSelector && container) {
    return createPortal(Content, container);
  }

  return Content;
};

Sidebar.Header = SidebarHeader;
Sidebar.Body = SidebarBody;
Sidebar.Footer = SidebarFooter;