import { memo, useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Box, OutlinedInput, SxProps, Theme } from '@mui/material';
import clsx from 'clsx';

// Styles
import styles from './Input.module.scss';

// Types
import { ResultState } from '@/src/types/shared.types';

// Utils
import { darkTheme, lightTheme } from '@/src/utils/theme';

// UI
import { ResultMessage } from '../ResultMessage/ResultMessage';

type InputProps = {
  autoFocus?: boolean;
  classes?: string;
  defaultValue?: string;
  disabled?: boolean;
  fullHeight?: boolean;
  label: string;
  message?: string;
  multiline?: number;
  padding?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  state?: ResultState;
  onChange?: (value: string) => void;
};

const Input = (props: InputProps) => {
  const { theme } = useTheme();

  // Refs
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Component state
  const [sxColors, setSxColors] = useState<SxProps<Theme> | undefined>(
    undefined
  );
  const [label, setLabel] = useState<string | undefined>(undefined);

  // Auto focus on mount
  useEffect(() => {
    props.autoFocus && inputRef.current && inputRef.current.focus();
  }, [inputRef.current, props.autoFocus]);

  // Set input colors by result state and theme
  useEffect(() => {
    let color: string | undefined = undefined;
    switch (props.state) {
      case ResultState.Error:
        color = 'error.main';
        break;
      case ResultState.Info:
        color = 'info.main';
        break;
      case ResultState.Success:
        color = 'success.main';
        break;
      case ResultState.Warning:
        color = 'warning.main';
        break;
      default:
        break;
    }

    setSxColors({
      '& .MuiOutlinedInput-root': {
        backgroundColor: 'bg.form',
      },
      '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: color ? color : 'transparent',
        borderWidth: '1px',
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: color ? color : 'border.card',
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: color ? color : 'text.primary',
      },
    });
  }, [props.state, theme]);

  return (
    <Box
      className={clsx(styles['input'], props.classes && props.classes)}
      sx={{
        ...sxColors,
        height: props.fullHeight ? '100%' : undefined,
        '& .MuiOutlinedInput-input': {
          padding: props.padding ?? '0.5rem',
        },
      }}
    >
      <Box
        className={styles['input-label']}
        sx={{
          background: `linear-gradient(180deg, transparent 50%, ${
            theme === 'dark'
              ? darkTheme.palette.bg.form
              : lightTheme.palette.bg.form
          } 0.1%, ${
            theme === 'dark'
              ? darkTheme.palette.bg.form
              : lightTheme.palette.bg.form
          } 50%)`,
          opacity: label ? 1 : 0,
        }}
      >
        {props.label}
      </Box>
      <OutlinedInput
        classes={{
          focused: styles['input-outlined-focused'],
          root: styles['input-outlined'],
        }}
        defaultValue={props.defaultValue && props.defaultValue}
        disabled={props.disabled}
        minRows={props.multiline && props.multiline}
        multiline={props.multiline ? true : false}
        placeholder={props.placeholder}
        inputRef={inputRef}
        sx={{
          fontSize: 14,
          height: props.fullHeight ? '100%' : undefined,
          padding: 0,
        }}
        onChange={(event) =>
          props.onChange && props.onChange(event.target.value)
        }
        onFocus={() => setLabel(props.label)}
        {...props.register}
        onBlur={() => setLabel(undefined)}
      />
      {props.message && props.state && (
        <ResultMessage message={props.message} state={props.state} />
      )}
    </Box>
  );
};

export default memo(Input);
