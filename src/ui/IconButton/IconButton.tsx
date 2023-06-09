import { forwardRef, memo, ReactNode } from 'react';
import { Button, SxProps, Theme } from '@mui/material';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import clsx from 'clsx';

// Styles
import styles from './IconButton.module.scss';

// Types
import { ColorType, FontSize } from '../../types/mui.types';

// UI
import Icon from '../Icon/Icon';

type IconButtonProps = {
  borderRadius?: string;
  children?: ReactNode;
  className?: string;
  color?: ColorType;
  disabled?: boolean;
  icon: [IconPrefix, IconName];
  iconSize?: FontSize;
  id?: string;
  padding?: string;
  sx?: SxProps<Theme>;
  onClick?: (event?: any) => void;
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    // Warning: React does not recognize the xxx prop on a DOM element.
    // If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase xxx instead.
    // If you accidentally passed it from a parent component, remove it from the DOM element.
    // https://reactjs.org/warnings/unknown-prop.html
    const {
      borderRadius,
      className: classes,
      color,
      disabled,
      icon,
      iconSize,
      ...rest
    } = props;

    return (
      <Button
        {...rest}
        className={clsx(
          styles['icon-button'],
          borderRadius ?? 'rounded-md',
          classes && classes
        )}
        color={color ?? 'inherit'}
        disabled={disabled && disabled}
        id={props.id}
        ref={ref}
        onClick={props.onClick && props.onClick}
        sx={{
          ...props.sx,
          padding: props.padding ?? '0.5rem',
        }}
      >
        <Icon
          className={clsx(
            styles['icon-button-icon'],
            disabled && styles['icon-button-disabled']
          )}
          icon={icon}
          size={iconSize ?? 'small'}
        />
        {props.children && props.children}
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default memo(IconButton);
