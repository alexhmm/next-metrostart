import { FC, memo } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Box, Button, Typography } from '@mui/material';

// Stores
import useCollectionStore from '@/src/modules/collection/collection.store';

// Styles
import styles from './CollectionList.module.scss';

// UI
import IconButton from '@/src/ui/IconButton/IconButton';

const CollectionList: FC = () => {
  const { t } = useTranslation();

  // Collection store state
  const [collections, setCollectionCreate] = useCollectionStore((state) => [
    state.collections,
    state.setCollectionCreate,
  ]);

  return (
    <div className={styles['collection-list']}>
      <Box
        className={styles['collection-list-content']}
        sx={{ backgroundColor: 'background.paper' }}
      >
        <div className={styles['collection-list-content-header']}>
          <Typography
            className={styles['collection-list-content-header-title']}
            variant="h6"
          >
            {t<any>('collection:your_library')}
          </Typography>
          <IconButton
            icon={['fas', 'plus']}
            onClick={() => setCollectionCreate(true)}
          />
        </div>
        {collections.map((collection) => (
          <Link key={collection.id} href={`/collections/${collection.id}`}>
            <Button className={styles['collection-list-item']} color="inherit">
              {collection.name}
            </Button>
          </Link>
        ))}
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
        <Button className={styles['collection-list-item']} color="inherit">
          Navigation
        </Button>
      </Box>
    </div>
  );
};

export default memo(CollectionList);
