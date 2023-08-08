import { ReactNode, memo, useCallback, useState } from 'react';
import { Button, PopoverOrigin, Typography } from '@mui/material';
import clsx from 'clsx';

// Icons
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

// Styles
import styles from './Menu.module.scss';

// Types
import { ColorType, FontSize } from '@/src/types/mui.types';
import { MenuItem as IMenuItem } from '@/src/types/shared.types';

// UI
import MenuPopover from './MenuPopover';

type MenuProps = {
  anchorOrigin?: PopoverOrigin;
  className?: string;
  color?: ColorType;
  disabled?: boolean;
  hideItemIcon?: boolean;
  iconSize?: FontSize;
  items: IMenuItem[];
  title: ReactNode | string;
  titleClassName?: string;
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
        <Typography
          className={clsx(
            styles['menu-title'],
            props.titleClassName && props.titleClassName
          )}
          variant={props.variant}
        >
          {props.title}
        </Typography>
        {anchorMenu ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
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
