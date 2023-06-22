import { FC, memo } from 'react';
import { Box, Button, Popover, PopoverOrigin } from '@mui/material';
import clsx from 'clsx';

// Styles
import styles from './Menu.module.scss';

// Types
import { MenuItem as IMenuItem } from '../../types/ui.types';

type MenuItemProps = {
  classes?: string;
  title: string;
  onClick: () => void;
};

const MenuItem = (props: MenuItemProps) => {
  return (
    <Button
      className={clsx(styles['menu-item'], props.classes && props.classes)}
      color="inherit"
      onClick={props.onClick}
    >
      {props.title}
    </Button>
  );
};

type MenuPopoverProps = {
  anchorMenu: HTMLElement | null;
  anchorOrigin?: PopoverOrigin;
  items: IMenuItem[];
  transformOrigin?: PopoverOrigin;
  onAction: (action: any) => void;
  onClose: () => void;
};

const MenuPopover: FC<MenuPopoverProps> = (props) => {
  return (
    <Popover
      anchorEl={props.anchorMenu}
      anchorOrigin={
        props.anchorOrigin ?? { horizontal: 'right', vertical: 'bottom' }
      }
      classes={{
        paper: styles['menu-popover-paper'],
        root: styles['menu-popover'],
      }}
      open={Boolean(props.anchorMenu)}
      transformOrigin={
        props.transformOrigin ?? {
          horizontal: 'right',
          vertical: 'top',
        }
      }
      onClose={props.onClose}
    >
      <Box
        className={styles['menu-popover-content']}
        sx={{ backgroundColor: 'bg.dialog' }}
      >
        {props.items.map((item, index) => {
          if (!item.undefined) {
            return (
              <MenuItem
                key={index}
                title={item.title}
                onClick={() => {
                  props.onClose();
                  props.onAction && props.onAction(item.action);
                }}
              />
            );
          }
          return null;
        })}
      </Box>
    </Popover>
  );
};

export default memo(MenuPopover);
