import { FC, memo } from 'react';
import { Button } from '@mui/material';

// Styles
import styles from './LinkItem.module.scss';

// Types
import { LinkItem as ILinkItem } from '@/src/modules/collection/collection.types';
import { CrudAction } from '@/src/types/shared.types';

// UI
import Icon from '@/src/ui/Icon/Icon';

type LinkItemButtonProps = {
  item?: ILinkItem;
  type?: CrudAction.Create;
  onClick?: () => void;
};

const LinkItemButton: FC<LinkItemButtonProps> = (props) => {
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
      onClick={props.onClick && props.onClick}
    >
      {props.item && (
        <>
          <img src={props.item.icon} />
          <div className={styles['link-item-title']}>{props.item.name}</div>
        </>
      )}
      {props.type === CrudAction.Create && (
        <Icon icon={['fas', 'plus']} size="medium" />
      )}
    </Button>
  );
};

type LinkItemProps = {
  item?: ILinkItem;
  type?: CrudAction.Create;
  onClick?: () => void;
};

const LinkItem: FC<LinkItemProps> = (props) => {
  return (
    <>
      {props.item ? (
        <a href={`//${props.item.url}`} rel="noreferrer">
          <LinkItemButton item={props.item} />
        </a>
      ) : (
        <LinkItemButton type={props.type} onClick={props.onClick} />
      )}
    </>
  );
};

export default memo(LinkItem);
