import { FC, memo, useCallback } from 'react';
import { Box, Typography } from '@mui/material';

// Hooks
import useCollection from '../../use-collection.hook';

// Icons
import AddIcon from '@mui/icons-material/Add';

// Styles
import styles from './Link.module.scss';

// Types
import { Link as ILink } from '@/src/modules/collection/collection.types';
import { CrudAction } from '@/src/types/shared.types';

// UI
import IconMenu from '@/src/ui/Menu/IconMenu';

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
      <IconMenu
        className={styles['link-menu']}
        id="menu"
        items={getLinkMenuActions()}
        onAction={onMenuAction}
      />
      {props.link && props.link.icon && (
        <>
          <img alt={props.link.name} src={props.link.icon} />
          <Typography className={styles['link-title']}>
            {props.link.name}
          </Typography>
        </>
      )}
      {props.type === CrudAction.Create && <AddIcon />}
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
