import { FC, memo } from 'react';
import { Button } from '@mui/material';

// Styles
import styles from './GridItem.module.scss';

// Types
import { GridItem as IGridItem } from '@/src/modules/collection/collection.types';

type GridItemProps = {
  item: IGridItem;
};

const GridItem: FC<GridItemProps> = (props) => {
  return (
    <Button
      className={styles['grid-item']}
      color="inherit"
      sx={{
        backgroundColor: 'bg.card',
        ':hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      <img src={props.item.favicon} />
      <div className={styles['grid-item-title']}>{props.item.title}</div>
    </Button>
  );
};

export default memo(GridItem);
