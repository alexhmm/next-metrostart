import Head from 'next/head';
import { Typography } from '@mui/material';

// Components
import GridItem from '@/src/modules/collection/components/GridItem/GridItem';

// Stores
import useCollectionStore from '@/src/modules/collection/collection.store';

// Styles
import styles from './Home.module.scss';

// UI
import IconButton from '@/src/ui/IconButton/IconButton';

export default function Home() {
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
            onClick={() => {
              setCollection([
                ...collection,
                {
                  id: new Date().toString(),
                  favicon:
                    'https://static.whatsapp.net/rsrc.php/v3/yz/r/ujTY9i_Jhs1.png',
                  title: 'Whatsapp',
                  url: 'https://whatsapp.com',
                },
              ]);
            }}
          />
        </div>
        <div className={styles['home-collection-content']}>
          {collection.map((item) => (
            <GridItem key={item.id} item={item} />
          ))}
        </div>
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
