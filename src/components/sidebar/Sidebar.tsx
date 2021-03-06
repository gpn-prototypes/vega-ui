import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { useKey } from '../../hooks';
import { usePortalRender } from '../root';

import { cnSidebar } from './cn-sidebar';
import { SidebarBody } from './SidebarBody';
import { SidebarFooter } from './SidebarFooter';
import { SidebarHeader } from './SidebarHeader';
import { SidebarContext } from './use-sidebar-context';

import './Sidebar.css';

export type SidebarProps = {
  isOpen?: boolean;
  isMinimized?: boolean;
  align?: 'left' | 'right';
  hasOverlay?: boolean;
  onOverlayClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent> | KeyboardEvent) => void;
  portal?: Element | null;
  onMinimize?: (event: React.MouseEvent) => void;
  onClose?: (event: React.MouseEvent) => void;
  className?: string;
};

export type SidebarType<T> = React.FC<T> & {
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

export const Sidebar: SidebarType<SidebarProps> = ({
  isOpen = false,
  isMinimized = false,
  align = 'right',
  hasOverlay = true,
  onOverlayClick,
  portal,
  onMinimize,
  onClose,
  className,
  children,
  ...rest
}) => {
  const showOverlay = isOpen && hasOverlay && !isMinimized;

  const { renderPortalWithTheme } = usePortalRender();

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | KeyboardEvent,
  ): void => {
    if (onOverlayClick) {
      onOverlayClick(event);
    }
  };

  useKey('Escape', handleOverlayClick);

  const cssTransitionProps = {
    timeout: 300,
    mountOnEnter: true,
    unmountOnExit: true,
    classNames: cssTransitionClasses,
  };

  const Content = (
    <>
      <CSSTransition in={isOpen} {...cssTransitionProps}>
        <SwitchTransition mode="out-in">
          <CSSTransition key={String(isMinimized)} {...cssTransitionProps}>
            <SidebarContext.Provider value={{ onMinimize, onClose }}>
              <aside
                aria-label="Сайдбар"
                className={cnSidebar({
                  /* В свернутом состоянии окно находится всегда с правой стороны - требование дизайнера */
                  align: isMinimized ? 'right' : align,
                  minimized: isMinimized,
                }).mix(className)}
                {...rest}
              >
                {children}
              </aside>
            </SidebarContext.Provider>
          </CSSTransition>
        </SwitchTransition>
      </CSSTransition>
      {showOverlay && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
        <div
          tabIndex={-1}
          aria-label="Оверлей"
          className={cnSidebar('Overlay')}
          onClick={handleOverlayClick}
        />
      )}
    </>
  );

  if (portal) {
    return renderPortalWithTheme(Content, portal);
  }

  return Content;
};

Sidebar.Header = SidebarHeader;
Sidebar.Body = SidebarBody;
Sidebar.Footer = SidebarFooter;
