import { ReactNode, memo, useCallback, useEffect, useState } from 'react';
import { Box, Button, Popover, PopoverOrigin, Typography } from '@mui/material';
import clsx from 'clsx';

// Icons
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

// Styles
import styles from './Dropdown.module.scss';

// Types
import { DropdownItem as IDropdownItem } from '@/src/types/shared.types';

type DropdownItemProps = {
  title: ReactNode | string;
  onClick: () => void;
};

const DropdownItem = (props: DropdownItemProps) => {
  return (
    <Button
      className={styles['dropdown-item']}
      color="inherit"
      onClick={props.onClick}
    >
      {props.title}
    </Button>
  );
};

type DropdownProps = {
  anchorOrigin?: PopoverOrigin;
  className?: string;
  disabled?: boolean;
  iconSize?: 'small' | 'medium' | 'large';
  items: IDropdownItem[];
  titleClassName?: string;
  transformOrigin?: PopoverOrigin;
  value: any;
  onChange: (value: any) => void;
};

const Dropdown = (props: DropdownProps) => {
  // Component state
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
  const [title, setTitle] = useState<ReactNode | string>('');

  // ####### //
  // EFFECTS //
  // ####### //

  // Set title by value
  useEffect(() => {
    setTitle(
      props.items.find((item) => item.value === props.value)?.title ?? ''
    );
  }, [props.items, props.value]);

  // ######### //
  // CALLBACKS //
  // ######### //

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
        className={styles['dropdown']}
        color="inherit"
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
            styles['dropdown-title'],
            props.titleClassName && props.titleClassName
          )}
        >
          {title}
        </Typography>
        {anchorMenu ? (
          <ArrowDropUpIcon
            className={styles['dropdown-icon']}
            fontSize={props.iconSize ?? 'medium'}
          />
        ) : (
          <ArrowDropDownIcon
            className={styles['dropdown-icon']}
            fontSize={props.iconSize ?? 'medium'}
          />
        )}
      </Button>
      <Popover
        anchorEl={anchorMenu}
        anchorOrigin={
          props.anchorOrigin ?? { horizontal: 'right', vertical: 'bottom' }
        }
        classes={{
          paper: styles['dropdown-popover-paper'],
          root: styles['dropdown-popover'],
        }}
        open={Boolean(anchorMenu)}
        transformOrigin={
          props.transformOrigin ?? {
            horizontal: 'right',
            vertical: 'top',
          }
        }
        onClose={onClose}
      >
        <Box
          className={styles['dropdown-popover-content']}
          sx={{ backgroundColor: 'bg.dialog' }}
        >
          {props.items.map((item, index) => {
            if (item.value) {
              return (
                <DropdownItem
                  key={index}
                  title={item.title}
                  onClick={() => {
                    onClose();
                    props.onChange(item.value);
                  }}
                />
              );
            }
          })}
        </Box>
      </Popover>
    </>
  );
};

export default memo(Dropdown);
