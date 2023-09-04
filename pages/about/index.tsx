import { FC, ReactNode } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box, Typography } from '@mui/material';

// Styles
import styles from './About.module.scss';

type AboutSectionProps = {
  children: ReactNode;
  title: string;
};

const AboutSection: FC<AboutSectionProps> = (props) => {
  return (
    <div className={styles['about-section']}>
      <Typography variant="h6">{props.title}</Typography>
      <Box
        className={styles['about-section-content']}
        sx={{ color: 'text.secondary' }}
      >
        {props.children}
      </Box>
    </div>
  );
};

export default function About(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Metrostart • {t('about:title')}</title>
      </Head>
      <Box
        className={styles['about']}
        sx={{ backgroundColor: 'background.paper' }}
      >
        <div className={styles['about-container']}>
          <Typography className={styles['about-title']} variant="h5">
            {t('about:title')}
          </Typography>
          <div className={styles['about-content']}>
            <AboutSection title={t('about:what.title')}>
              <p>{t('about:what.content1')}</p>
              <p>{t('about:what.content2')}</p>
            </AboutSection>
            <AboutSection title={t('about:functionality.title')}>
              <p>{t('about:functionality.content1')}</p>
              <p>{t('about:functionality.content2')}</p>
              <p>{t('about:functionality.content3')}</p>
              <p>{t('about:functionality.content4')}</p>
            </AboutSection>
            <AboutSection title={t('about:data.title')}>
              <p>{t('about:data.content1')}</p>
              <p>{t('about:data.content2')}</p>
            </AboutSection>
          </div>
        </div>
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'about'])),
  },
});
