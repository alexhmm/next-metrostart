import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

export enum CrudAction {
  Create = 'CREATE',
  Delete = 'DELETE',
  Read = 'READ',
  Update = 'UPDATE',
}

export enum ResultState {
  Error = 'ERROR',
  Info = 'INFO',
  Success = 'SUCCESS',
  Warning = 'WARNING',
}

export interface MenuItem {
  action: any;
  disabled?: boolean;
  icon?: [IconPrefix, IconName];
  title: string;
  tooltip?: string;
  undefined?: boolean;
}
