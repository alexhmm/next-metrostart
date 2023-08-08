import { FC, ReactNode, memo } from 'react';
import { Box, Popover, PopoverOrigin } from '@mui/material';

// Styles
import styles from './Menu.module.scss';

// Types
import { MenuItem as IMenuItem, MenuElement } from '@/src/types/shared.types';

// UI
import MenuCheckbox from './MenuCheckbox';
import MenuButton from './MenuButton';

type MenuItemProps = {
  checked?: boolean;
  classes?: string;
  elem?: MenuElement;
  icon?: ReactNode;
  title: string;
  onClick: () => void;
};

const MenuItem = (props: MenuItemProps) => {
  switch (props.elem) {
    case MenuElement.Checkbox:
      return (
        <MenuCheckbox
          checked={!!props.checked}
          icon={props.icon}
          title={props.title}
          onClick={props.onClick}
        />
      );
    default:
      return <MenuButton {...props} />;
  }
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
        sx={{ backgroundColor: 'bg.menu' }}
      >
        {props.items.map((item, index) => {
          if (!item.undefined) {
            return (
              <MenuItem
                key={index}
                checked={item.checked}
                elem={item.elem}
                icon={item.icon}
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
