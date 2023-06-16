import { FC, memo, useCallback } from 'react';
import { Box } from '@mui/material';

// Hooks
import useCollection from '../../use-collection.hook';

// Styles
import styles from './Link.module.scss';

// Types
import { Link as ILink } from '@/src/modules/collection/collection.types';
import { CrudAction } from '@/src/types/shared.types';

// UI
import Icon from '@/src/ui/Icon/Icon';
import Menu from '@/src/ui/Menu/Menu';

type LinkButtonProps = {
  link?: ILink;
  type?: CrudAction;
  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
};

const LinkButton: FC<LinkButtonProps> = (props) => {
  const { getLinkMenuActions } = useCollection();

  // ######### //
  // CALLBACKS //
  // ######### //

  /**
   * Handler to link menu action.
   * @param action CrudAction
   */
  const onMenuAction = useCallback(
    (action: CrudAction) => {
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
    },
    [props]
  );

  return (
    <Box
      className={styles['link']}
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
        className={styles['link-menu']}
        icon={['fas', 'ellipsis-v']}
        id="menu"
        items={getLinkMenuActions()}
        onAction={onMenuAction}
      />
      {props.link && (
        <>
          <img src={props.link.icon} />
          <div className={styles['link-title']}>{props.link.name}</div>
        </>
      )}
      {props.type === CrudAction.Create && (
        <Icon icon={['fas', 'plus']} size="medium" />
      )}
    </Box>
  );
};

type LinkProps = {
  link?: ILink;
  type?: CrudAction.Create;
  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
};

const Link: FC<LinkProps> = (props) => {
  const https =
    props.link?.url.includes('http://') || props.link?.url.includes('https://');

  return (
    <>
      {props.link ? (
        <a
          href={https ? props.link?.url : `//${props.link.url}`}
          rel="noreferrer"
        >
          <LinkButton
            link={props.link}
            onDelete={props.onDelete}
            onEdit={props.onEdit}
          />
        </a>
      ) : (
        <LinkButton type={props.type} onClick={props.onClick} />
      )}
    </>
  );
};

export default memo(Link);
