import { FC, memo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Box, Divider } from '@mui/material';

// Icons
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

// Styles
import styles from './Footer.module.scss';

// Types
import { Language } from '@/src/types/shared.types';

// UI
import Dropdown from '@/src/ui/Dropdown/Dropdown';
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
        alt={
          props.locale === Language.English
            ? t('common:settings.language.en').toString()
            : t('common:settings.language.de').toString()
        }
        className={styles['dropdown-language-item-image']}
        src={imgSrc}
      />
      <div className={styles['dropdown-language-item-title']}>{title}</div>
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
        <div className={styles['footer-content-main']}>
          <div className={styles['footer-content-main-language']}>
            {i18n.language && (
              <Dropdown
                iconSize="small"
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
                titleClassName={styles['footer-content-main-language-title']}
                value={i18n.language}
                onChange={onChangeLanguage}
              />
            )}
          </div>
          <div className={styles['footer-content-main-links']}>
            <PrimaryLink href={`/about`}>{t('common:pages.about')}</PrimaryLink>
            <PrimaryLink href={`/imprint`}>
              {t('common:pages.imprint')}
            </PrimaryLink>
          </div>
        </div>
        <div className={styles['footer-content-info']}>
          <PrimaryLink
            className={styles['footer-content-info-email']}
            href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
          >
            <span>{process.env.NEXT_PUBLIC_EMAIL}</span>
            <ArrowOutwardIcon
              className={styles['footer-content-info-email-icon']}
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
