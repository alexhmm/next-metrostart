import { memo, useCallback, useState } from 'react';
import { IconName, IconPrefix } from '@fortawesome/free-solid-svg-icons';
import { Button, PopoverOrigin, Typography } from '@mui/material';
import clsx from 'clsx';

// Styles
import styles from './Menu.module.scss';

// Types
import { ColorType, FontSize } from '../../types/mui.types';
import { MenuItem as IMenuItem } from '../../types/shared.types';

// UI
import Icon from '../Icon/Icon';
import MenuPopover from './MenuPopover';

type MenuProps = {
  anchorOrigin?: PopoverOrigin;
  className?: string;
  color?: ColorType;
  disabled?: boolean;
  hideItemIcon?: boolean;
  icon?: [IconPrefix, IconName];
  iconSize?: FontSize;
  items: IMenuItem[];
  title: string;
  transformOrigin?: PopoverOrigin;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  onAction: (action: any) => void;
};

const Menu = (props: MenuProps) => {
  // Component state
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);

  /**
   * Handler on menu click.
   */
  const onClick = useCallback((event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorMenu(event.currentTarget);
  }, []);

  /**
   * Handler to close menu.
   */
  const onClose = useCallback(() => {
    setAnchorMenu(null);
  }, []);

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={Boolean(anchorMenu) ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorMenu) ? 'true' : undefined}
        className={styles['menu']}
        color={props.color ?? 'inherit'}
        disableRipple
        sx={{
          '&:hover': {
            backgroundColor: 'transparent',
            color: 'primary.main',
          },
        }}
        onClick={onClick}
      >
        <Typography className={styles['menu-title']} variant={props.variant}>
          {props.title}
        </Typography>
        <Icon
          classes={clsx(
            styles['menu-icon'],
            props.disabled && styles['menu-icon-disabled']
          )}
          icon={
            props.icon ?? ['fas', anchorMenu ? 'chevron-up' : 'chevron-down']
          }
          size={props.iconSize ?? 'small'}
          sx={{
            padding:
              !props.iconSize || props.iconSize === 'small' ? '2px' : undefined,
          }}
        />
      </Button>
      <MenuPopover
        anchorMenu={anchorMenu}
        items={props.items}
        onAction={props.onAction}
        onClose={onClose}
      />
    </>
  );
};

export default memo(Menu);
