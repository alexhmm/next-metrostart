import { FC, memo } from 'react';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import clsx from 'clsx';

// Styles
import styles from './Logo.module.scss';

type LogoProps = {
  backgroundColor?: string;
  className?: string;
};

const Logo: FC<LogoProps> = (props) => {
  return (
    <Link href="/">
      <Box
        className={clsx(styles['logo'], props.className && props.className)}
        sx={{ backgroundColor: props.backgroundColor }}
      >
        <Typography className={styles['logo-title']} variant="h6">
          Metrostart
        </Typography>
      </Box>
    </Link>
  );
};

export default memo(Logo);
