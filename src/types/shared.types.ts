export enum CrudAction {
  Create = 'CREATE',
  Delete = 'DELETE',
  Read = 'READ',
  Update = 'UPDATE',
}

export enum HeaderMenuAction {
  ToggleTheme = 'TOGGLE_THEME',
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

export interface MenuItem {
  action: any;
  title: string;
}
