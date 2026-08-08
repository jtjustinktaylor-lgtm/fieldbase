import { useApp } from '../store/AppContext';
import { translate, Lang } from './translations';

export function useTranslation() {
  const { settings } = useApp();
  const lang: Lang = (settings.language as Lang) || 'en';

  function t(key: string): string {
    return translate(key, lang);
  }

  return { t, lang };
}
