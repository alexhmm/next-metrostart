import { memo, ReactNode } from 'react';
import {
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import clsx from 'clsx';

// Icons
import CloseIcon from '@mui/icons-material/Close';

// Styles
import styles from './Dialog.module.scss';

// Types
import { DialogAction, DialogActionType } from '@/src/types/shared.types';

// UI
import IconButton from '../IconButton/IconButton';
import TextButtonOutlined from '../TextButtonOutlined/TextButtonOutlined';

type DialogProps = {
  actions?: DialogAction[];
  children: ReactNode;
  className?: string;
  open: boolean;
  title: string;
  widthClassName?: string;
  onCancel?: () => void;
  onClose: () => void;
  onSubmit?: () => void;
};

const Dialog = (props: DialogProps) => {
  /**
   * Handler on dialog action.
   * @param action DialogActionType
   */
  const onDialogAction = (action: DialogActionType) => {
    switch (action) {
      case DialogActionType.Cancel:
        props.onCancel && props.onCancel();
        break;
      case DialogActionType.Submit:
        props.onSubmit && props.onSubmit();
        break;
      default:
        break;
    }
  };

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
      {props.actions && (
        <DialogActions className={styles['dialog-actions']}>
          {props.actions.map((action) => (
            <TextButtonOutlined
              key={action.type}
              disabled={action.disabled}
              onClick={() => onDialogAction(action.type)}
            >
              {action.title}
            </TextButtonOutlined>
          ))}
        </DialogActions>
      )}
    </MuiDialog>
  );
};

export default memo(Dialog);
