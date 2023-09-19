import { ReactNode } from 'react';

export enum CrudAction {
  Create = 'CREATE',
  Delete = 'DELETE',
  Read = 'READ',
  Update = 'UPDATE',
}

export enum DialogActionType {
  Cancel = 'CANCEL',
  Submit = 'SUBMIT',
}

export enum HeaderMenuAction {
  ToggleTheme = 'TOGGLE_THEME',
}

export enum MenuElement {
  Button = 'BUTTON',
  Checkbox = 'CHECKBOX',
}

export enum Language {
  English = 'en',
  German = 'de',
}

export enum ResultState {
  Error = 'ERROR',
  Info = 'INFO',
  Success = 'SUCCESS',
  Warning = 'WARNING',
}

export interface DialogAction {
  disabled?: boolean;
  title: string;
  type: DialogActionType;
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
  undefined?: boolean;
}
