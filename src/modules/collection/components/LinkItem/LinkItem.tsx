import { FC, memo, useCallback } from 'react';
import { Box } from '@mui/material';

// Hooks
import useCollection from '../../use-collection.hook';

// Styles
import styles from './LinkItem.module.scss';

// Types
import { LinkItem as ILinkItem } from '@/src/modules/collection/collection.types';
import { CrudAction } from '@/src/types/shared.types';

// UI
import Icon from '@/src/ui/Icon/Icon';
import Menu from '@/src/ui/Menu/Menu';

type LinkItemButtonProps = {
  link?: ILinkItem;
  type?: CrudAction;
  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
};

const LinkItemButton: FC<LinkItemButtonProps> = (props) => {
  const { getLinkMenuActions } = useCollection();

  // ######### //
  // CALLBACKS //
  // ######### //

  /**
   * Handler to link menu action.
   * @param action CrudAction
   */
  const onMenuAction = useCallback((action: CrudAction) => {
    switch (action) {
      case CrudAction.Update:
        props.onEdit && props.onEdit();
        break;
      case CrudAction.Delete:
        props.onDelete && props.onDelete();
        break;
      default:
        break;
    }
  }, []);

  return (
    <Box
      className={styles['link-item']}
      color="inherit"
      sx={{
        backgroundColor: 'background.paper',
        '& #menu': {
          display: props.type === CrudAction.Create ? 'none' : 'flex',
          opacity: 0,
        },
        ':hover': {
          backgroundColor: 'action.hover',
          '& #menu': {
            opacity: 1,
          },
        },
      }}
      onClick={props.onClick && props.onClick}
    >
      <Menu
        className={styles['link-item-menu']}
        icon={['fas', 'ellipsis-v']}
        id="menu"
        items={getLinkMenuActions()}
        onAction={onMenuAction}
      />
      {props.link && (
        <>
          <img src={props.link.icon} />
          <div className={styles['link-item-title']}>{props.link.name}</div>
        </>
      )}
      {props.type === CrudAction.Create && (
        <Icon icon={['fas', 'plus']} size="medium" />
      )}
    </Box>
  );
};

type LinkItemProps = {
  link?: ILinkItem;
  type?: CrudAction.Create;
  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
};

const LinkItem: FC<LinkItemProps> = (props) => {
  return (
    <>
      {props.link ? (
        <a href={`//${props.link.url}`} rel="noreferrer">
          <LinkItemButton
            link={props.link}
            onDelete={props.onDelete}
            onEdit={props.onEdit}
          />
        </a>
      ) : (
        <LinkItemButton type={props.type} onClick={props.onClick} />
      )}
    </>
  );
};

export default memo(LinkItem);
