import { FC, memo } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Box, Button, Typography } from '@mui/material';

// Component
import Logo from '../Logo/Logo';

// Stores
import useCollectionStore from '@/src/modules/collection/collection.store';

// Styles
import styles from './Navigation.module.scss';

// UI
import IconButton from '@/src/ui/IconButton/IconButton';

const Navigation: FC = () => {
  const { t } = useTranslation();

  // Collection store state
  const [collections, setCollectionCreate] = useCollectionStore((state) => [
    state.collections,
    state.setCollectionCreate,
  ]);

  return (
    <Box
      className={styles['navigation']}
      sx={{ backgroundColor: 'background.default' }}
    >
      <Logo
        backgroundColor="background.default"
        className={styles['navigation-logo']}
      />
      <Box
        className={styles['navigation-header']}
        sx={{ backgroundColor: 'background.default' }}
      >
        <Typography className={styles['navigation-header-title']} variant="h6">
          {t<any>('collection:your_library')}
        </Typography>
        <IconButton
          icon={['fas', 'plus']}
          onClick={() => setCollectionCreate(true)}
        />
      </Box>
      {collections.map((collection) => (
        <Link key={collection.id} href={`/collections/${collection.id}`}>
          <Button className={styles['navigation-item']} color="inherit">
            {collection.name}
          </Button>
        </Link>
      ))}
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      <div>Navigation</div>
      {/* </Box> */}
    </Box>
  );
};

export default memo(Navigation);
