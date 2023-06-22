import { ReactNode } from 'react';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

export interface DropdownItem {
  title: ReactNode | string;
  value: any;
}

export interface MenuItem {
  action: any;
  disabled?: boolean;
  icon?: [IconPrefix, IconName];
  title: string;
  tooltip?: string;
  undefined?: boolean;
}
