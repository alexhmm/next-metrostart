import { FC, memo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Box, Divider } from '@mui/material';

// Styles
import styles from './Footer.module.scss';

// Types
import { Language } from '@/src/types/shared.types';

// UI
import Dropdown from '@/src/ui/Dropdown/Dropdown';
import Icon from '@/src/ui/Icon/Icon';
import PrimaryLink from '@/src/ui/PrimaryLink/PrimaryLink';

type DropdownLanguageItemProps = {
  locale: Language;
};

const DropdownLanguageItem: FC<DropdownLanguageItemProps> = (props) => {
  const { t } = useTranslation();

  let imgSrc: string | undefined = undefined;
  let title: string | undefined;
  switch (props.locale) {
    case Language.German:
      imgSrc = '/assets/de.svg';
      title = t('common:settings.language.de').toString();
      break;
    default:
      imgSrc = '/assets/en.svg';
      title = t('common:settings.language.en').toString();
      break;
  }

  return (
    <div className={styles['dropdown-language-item']}>
      <img
        alt={props.locale}
        className={styles['dropdown-language-item-image']}
        src={imgSrc}
      />
      <span className={styles['dropdown-language-item-title']}>{title}</span>
    </div>
  );
};

const Footer: FC = () => {
  const router = useRouter();
  const { i18n, t } = useTranslation();

  /**
   * Handler on language change.
   * @param lng Language
   */
  const onChangeLanguage = useCallback(
    (lng: Language) => {
      router.push(`${router.asPath}`, `${router.asPath}`, { locale: lng });
    },
    [router.pathname]
  );

  return (
    <div className={styles['footer']}>
      <Divider />
      <div className={styles['footer-content']}>
        <div className={styles['footer-content-language']}>
          {i18n.language && (
            <Dropdown
              iconMarginClassName={
                styles['footer-content-language-icon-margin']
              }
              iconPaddingClassName={
                styles['footer-content-language-icon-padding']
              }
              items={[
                {
                  title: <DropdownLanguageItem locale={Language.English} />,
                  value: Language.English,
                },
                {
                  title: <DropdownLanguageItem locale={Language.German} />,
                  value: Language.German,
                },
              ]}
              titleClassName={styles['footer-content-language-title']}
              value={i18n.language}
              onChange={onChangeLanguage}
            />
          )}
        </div>
        <div className={styles['footer-content-links']}>
          <PrimaryLink href={`/about`}>{t('common:pages.about')}</PrimaryLink>
          <PrimaryLink href={`/imprint`}>
            {t('common:pages.imprint')}
          </PrimaryLink>
        </div>
        <div className={styles['footer-content-info']}>
          <PrimaryLink
            className={styles['footer-content-info-email']}
            href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
          >
            <span>{process.env.NEXT_PUBLIC_EMAIL}</span>
            <Icon
              className={styles['footer-content-info-email-icon']}
              icon={['fas', 'arrow-up-right-from-square']}
            />
          </PrimaryLink>
          <Box sx={{ color: 'text.secondary' }}>
            {process.env.NEXT_PUBLIC_COPYRIGHT}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
