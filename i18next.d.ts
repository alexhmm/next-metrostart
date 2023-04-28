import 'i18next';
import collection from './public/locales/en/collection.json';
import common from './public/locales/en/common.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      collection: typeof collection;
    };
    returnNull: false;
  }
}
