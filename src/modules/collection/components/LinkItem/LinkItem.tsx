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
    <a href={`//${props.item.url}`} rel="noreferrer">
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
        <img src={props.item.icon} />
        <div className={styles['link-item-title']}>{props.item.name}</div>
      </Button>
    </a>
  );
};

export default memo(LinkItem);
