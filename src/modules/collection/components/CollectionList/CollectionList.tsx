import { FC, memo, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Box, Button, Icon, Typography } from '@mui/material';

// Icons
import AddIcon from '@mui/icons-material/Add';

// Stores
import useCollectionStore from '@/src/modules/collection/collection.store';

// Styles
import styles from './CollectionList.module.scss';

// UI
import IconButton from '@/src/ui/IconButton/IconButton';

const CollectionList: FC = () => {
  const { t } = useTranslation();

  // Refs
  const listRef = useRef<HTMLDivElement | null>(null);
  const listContentRef = useRef<HTMLElement | null>(null);

  // Component state
  const [scrollTopLast, setScrollTopLast] = useState<number>(0);

  // Collection store state
  const [collections, setCollectionCreate] = useCollectionStore((state) => [
    state.collections,
    state.setCollectionCreate,
  ]);

  // Calculate sticky list on scroll
  useEffect(() => {
    const onScroll = () => {
      if (listRef.current && listContentRef.current) {
        const scrollTop = window.scrollY;
        setScrollTopLast(scrollTop);
        const viewportHeight = window.innerHeight;
        const listContentHeight =
          listContentRef.current.getBoundingClientRect().height;
        const listTop =
          listRef.current.getBoundingClientRect().top + window.scrollY;
        if (
          scrollTop > scrollTopLast &&
          scrollTop >= listContentHeight - viewportHeight + listTop
        ) {
          listContentRef.current.style.position = 'sticky';
          listContentRef.current.style.top = `-${
            listContentHeight - viewportHeight
          }px`;
        }
        // #todo: Scroll back immediately on scroll up
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [listRef, listContentRef, scrollTopLast]);

  return (
    <div className={styles['collection-list']} ref={listRef}>
      <Box
        className={styles['collection-list-content']}
        ref={listContentRef}
        sx={{ backgroundColor: 'background.paper' }}
      >
        <div className={styles['collection-list-content-header']}>
          <Typography
            className={styles['collection-list-content-header-title']}
            variant="h6"
          >
            {t('collection:your_library')}
          </Typography>
          <IconButton
            icon={<AddIcon />}
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
      </Box>
    </div>
  );
};

export default memo(CollectionList);
