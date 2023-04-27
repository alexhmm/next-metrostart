import { useEffect, useState } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import clsx from 'clsx';

// Styles
import styles from './ResultMessage.module.scss';

// Tyoes
import { ResultState } from '@/src/types/shared.types';

type ResultMessageProps = {
  message: string;
  classes?: string;
  padding?: string;
  state: ResultState;
};

export const ResultMessage = (props: ResultMessageProps) => {
  // Component state
  const [sxColors, setSxColors] = useState<SxProps<Theme> | undefined>(
    undefined
  );

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

    // Set result message color by result state
    setSxColors({
      color,
    });
  }, [props]);

  return (
    <Box
      sx={{ ...sxColors }}
      className={clsx(styles['result-message'], props.classes && props.classes)}
    >
      {props.message}
    </Box>
  );
};
