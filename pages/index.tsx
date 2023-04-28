import { useState } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Typography } from '@mui/material';

// Components
import LinkItem from '@/src/modules/collection/components/GridItem/LinkItem';
import LinkItemCreateEdit from '@/src/modules/collection/components/LinkItemCreateEdit/LinkItemCreateEdit';

// Stores
import useCollectionStore from '@/src/modules/collection/collection.store';

// Styles
import styles from './Home.module.scss';

// UI
import Dialog from '@/src/ui/Dialog/Dialog';
import IconButton from '@/src/ui/IconButton/IconButton';

export default function Home(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();
  const { t } = useTranslation();

  // Change language
  const changeTo = router.locale === 'en' ? 'de' : 'en';

  // Component state
  const [linkAddEdit, setLinkAddEdit] = useState<boolean>(false);

  // Collection store state
  const [collection, setCollection] = useCollectionStore((state) => [
    state.collection,
    state.setCollection,
  ]);

  return (
    <>
      <Head>
        <title>Metrostart</title>
      </Head>
      <main className={styles['home']}>
        <div className={styles['home-collection-header']}>
          <Typography
            className={styles['home-collection-header-title']}
            variant="h5"
          >
            Collection
          </Typography>
          <IconButton
            icon={['fas', 'plus']}
            // onClick={() => {
            //   setCollection([
            //     ...collection,
            //     {
            //       id: new Date().toString(),
            //       favicon:
            //         'https://static.whatsapp.net/rsrc.php/v3/yz/r/ujTY9i_Jhs1.png',
            //       title: 'Whatsapp',
            //       url: 'https://whatsapp.com',
            //     },
            //   ]);
            // }}
            onClick={() => setLinkAddEdit(true)}
          />
        </div>
        <div className={styles['home-collection-content']}>
          {collection.map((item) => (
            <LinkItem key={item.id} item={item} />
          ))}
        </div>
        <Link href="/" locale={changeTo}>
          {/* #TODO: Type 'TFunctionDetailedResult<never>' is not assignable to type 'ReactI18NextChildren'. */}
          <button>
            {t<any>('common:settings.language.title', { changeTo })}
          </button>
        </Link>
        <Dialog
          open={linkAddEdit}
          title="Link hinzufügen"
          onClose={() => setLinkAddEdit(false)}
        >
          <LinkItemCreateEdit />
        </Dialog>

        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'collection'])),
  },
});
