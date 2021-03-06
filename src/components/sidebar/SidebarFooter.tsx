import React from 'react';

import { cnSidebar } from './cn-sidebar';

export type SidebarFooterProps = {
  className?: string;
};

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ className, children, ...rest }) => (
  <footer className={cnSidebar('Footer').mix(className)} {...rest}>
    {children}
  </footer>
);
