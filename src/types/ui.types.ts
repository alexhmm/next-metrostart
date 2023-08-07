import { ReactNode } from 'react';

export enum MenuElement {
  Button = 'BUTTON',
  Checkbox = 'CHECKBOX',
}

export interface DropdownItem {
  title: ReactNode | string;
  value: any;
}

export interface MenuItem {
  action: any;
  checked?: boolean;
  elem?: MenuElement;
  disabled?: boolean;
  icon?: ReactNode;
  title: string;
  tooltip?: string;
  undefined?: boolean;
}
