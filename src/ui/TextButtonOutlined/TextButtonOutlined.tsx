import { memo, ReactNode } from 'react';
import { Button, SxProps, Theme } from '@mui/material';
import clsx from 'clsx';

// Styles
import styles from './TextButtonOutlined.module.scss';

type TextButtonOutlinedProps = {
  children: ReactNode;
  classes?: string;
  sx?: SxProps<Theme>;
  type?: 'reset' | 'submit';
  onClick?: () => void;
};

const TextButtonOutlined = (props: TextButtonOutlinedProps) => {
  return (
    <Button
      classes={{
        root: clsx(
          styles['text-button-outlined'],
          props.classes && props.classes
        ),
      }}
      variant="outlined"
      sx={{
        ...props.sx,
        backgroundColor: 'transparent',
        borderColor: 'action.selected',
        color: 'text.primary',
        '&:hover': {
          backgroundColor: 'transparent',
          borderColor: 'text.primary',
        },
      }}
      type={props.type}
      onClick={props.onClick && props.onClick}
    >
      {props.children}
    </Button>
  );
};

export default memo(TextButtonOutlined);
