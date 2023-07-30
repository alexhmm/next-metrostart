import { memo, ReactNode } from 'react';
import { Button } from '@mui/material';
import clsx from 'clsx';

// Styles
import styles from './IconButton.module.scss';

// Types
import { ColorType, FontSize } from '../../types/mui.types';

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
      id={props.id}
      onClick={props.onClick && props.onClick}
    >
      {props.icon}
    </Button>
  );
};

export default memo(IconButton);
