import { memo, ReactNode } from 'react';
import { Dialog as MuiDialog, DialogContent, DialogTitle } from '@mui/material';
import clsx from 'clsx';

// Icons
import CloseIcon from '@mui/icons-material/Close';

// Styles
import styles from './Dialog.module.scss';

// UI
import IconButton from '../IconButton/IconButton';

type DialogProps = {
  children: ReactNode;
  className?: string;
  open: boolean;
  title: string;
  widthClassName?: string;
  onClose: () => void;
};

const Dialog = (props: DialogProps) => {
  return (
    <MuiDialog
      classes={{
        paper: clsx(
          styles['dialog'],
          props.className && props.className,
          props.widthClassName ?? styles['dialog-width']
        ),
      }}
      PaperProps={{
        sx: {
          backgroundColor: 'bg.dialog',
          backgroundImage: 'unset',
        },
      }}
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle className={styles['dialog-title']}>
        <div className={styles['dialog-title-text']}>{props.title}</div>
        <IconButton
          className={styles['dialog-title-close']}
          icon={<CloseIcon />}
          onClick={props.onClose}
        />
      </DialogTitle>
      <DialogContent id="dialog-content">{props.children}</DialogContent>
    </MuiDialog>
  );
};

export default memo(Dialog);
