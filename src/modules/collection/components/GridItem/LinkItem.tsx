import { FC, memo } from 'react';
import { Button } from '@mui/material';

// Styles
import styles from './LinkItem.module.scss';

// Types
import { LinkItem as ILinkItem } from '@/src/modules/collection/collection.types';

type LinkItemProps = {
  item: ILinkItem;
};

const LinkItem: FC<LinkItemProps> = (props) => {
  return (
    <Button
      className={styles['link-item']}
      color="inherit"
      sx={{
        backgroundColor: 'bg.card',
        ':hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      <img src={props.item.favicon} />
      <div className={styles['link-item-title']}>{props.item.name}</div>
    </Button>
  );
};

export default memo(LinkItem);
