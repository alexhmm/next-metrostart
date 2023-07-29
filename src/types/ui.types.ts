import { ReactNode } from 'react';

export interface DropdownItem {
  title: ReactNode | string;
  value: any;
}

export interface MenuItem {
  action: any;
  disabled?: boolean;
  icon?: ReactNode;
  title: string;
  tooltip?: string;
  undefined?: boolean;
}
