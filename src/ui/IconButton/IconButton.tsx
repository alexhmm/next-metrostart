import { memo, ReactNode } from 'react';
import { Button } from '@mui/material';
import clsx from 'clsx';

// Styles
import styles from './IconButton.module.scss';

// Types
import { ColorType, FontSize } from '@/src/types/mui.types';

type IconButtonProps = {
  className?: string;
  color?: ColorType;
  disabled?: boolean;
  icon: ReactNode;
  iconSize?: FontSize;
  id?: string;
  onClick?: (event?: any) => void;
};

const IconButton = (props: IconButtonProps) => {
  return (
    <Button
      className={clsx(
        styles['icon-button'],
        props.className && props.className
      )}
      color={props.color ?? 'inherit'}
      disabled={props.disabled && props.disabled}
      disableRipple
      id={props.id}
      sx={{
        '&:hover': {
          backgroundColor: 'transparent',
          color: 'primary.main',
        },
      }}
      onClick={props.onClick && props.onClick}
    >
      {props.icon}
    </Button>
  );
};

export default memo(IconButton);
