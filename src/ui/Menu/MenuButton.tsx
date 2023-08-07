import { FC, ReactNode, memo } from 'react';
import { Button } from '@mui/material';
import clsx from 'clsx';

// Styles
import styles from './Menu.module.scss';

type MenuButtonProps = {
  classes?: string;
  icon?: ReactNode;
  title: string;
  onClick: () => void;
};

const MenuButton: FC<MenuButtonProps> = (props) => {
  return (
    <Button
      className={clsx(
        styles['menu-button'],
        styles['menu-item'],
        props.classes && props.classes
      )}
      color="inherit"
      onClick={props.onClick}
    >
      {props.icon && (
        <div className={styles['menu-item-icon']}>{props.icon}</div>
      )}
      <span>{props.title}</span>
    </Button>
  );
};

export default memo(MenuButton);
