import { Button, Checkbox } from '@mui/material';
import { FC, ReactNode } from 'react';
import clsx from 'clsx';

// Styles
import styles from './Menu.module.scss';

type MenuCheckboxProps = {
  checked: boolean;
  classes?: string;
  icon?: ReactNode;
  title: string;
  onClick: () => void;
};

const MenuCheckbox: FC<MenuCheckboxProps> = (props) => {
  return (
    <Button
      className={clsx(
        styles['menu-checkbox'],
        styles['menu-item'],
        props.classes && props.classes
      )}
      color="inherit"
      onClick={props.onClick}
    >
      {props.icon && (
        <div className={styles['menu-item-icon']}>{props.icon}</div>
      )}
      <div className={styles['menu-checkbox-content']}>
        <span className={styles['menu-checkbox-content-title']}>
          {props.title}
        </span>
        <Checkbox
          checked={props.checked}
          className={styles['menu-checkbox-content-elem']}
        />
      </div>
    </Button>
  );
};

export default MenuCheckbox;
