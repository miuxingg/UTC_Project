import { TOptions } from 'i18next';

import i18n from '../../languages/i18n';

export const translate = (key: string, options?: TOptions): string => {
  return i18n.t(key, options);
};
