import { FC, ReactNode } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box, Typography } from '@mui/material';

// Styles
import styles from './Imprint.module.scss';
import PrimaryLink from '@/src/ui/PrimaryLink/PrimaryLink';

type ImprintSectionProps = {
  children: ReactNode;
  title: string;
};

const ImprintSection: FC<ImprintSectionProps> = (props) => {
  return (
    <div className={styles['imprint-section']}>
      <Typography className={styles['imprint-section-title']}>
        {props.title}
      </Typography>
      <div className={styles['imprint-section-content']}>{props.children}</div>
    </div>
  );
};

export default function Imprint(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { i18n, t } = useTranslation();

  return (
    <>
      <Head>
        <title>Metrostart • {t('imprint:title')}</title>
      </Head>
      <Box
        className={styles['imprint']}
        sx={{ backgroundColor: 'background.paper' }}
      >
        <div className={styles['imprint-container']}>
          <Typography className={styles['imprint-title']} variant="h5">
            {t('imprint:title')}
          </Typography>
          <div className={styles['imprint-content']}>
            <ImprintSection title={t('imprint:contact.title')}>
              <span>{process.env.NEXT_PUBLIC_CONTACT_NAME}</span>
              <span>{process.env.NEXT_PUBLIC_CONTACT_STREET}</span>
              <span>{process.env.NEXT_PUBLIC_CONTACT_ZIP_CODE_CITY}</span>
              <span className="mb-4">
                {i18n.language === 'en'
                  ? process.env.NEXT_PUBLIC_CONTACT_COUNTRY_EN
                  : process.env.NEXT_PUBLIC_CONTACT_COUNTRY_DE}
              </span>
              <PrimaryLink
                className={styles['imprint-content-contact-email']}
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
              >
                {process.env.NEXT_PUBLIC_EMAIL}
              </PrimaryLink>
            </ImprintSection>
          </div>
        </div>
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'imprint'])),
  },
});
