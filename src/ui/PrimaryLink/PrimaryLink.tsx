import { FC, ReactNode, memo } from 'react';
import Link from 'next/link';
import { Box } from '@mui/material';
import clsx from 'clsx';

// Styles
import styles from './PrimaryLink.module.scss';

type PrimaryLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
};

const PrimaryLink: FC<PrimaryLinkProps> = (props) => {
  return (
    <Box
      sx={{
        '#link:hover': {
          color: 'primary.main',
        },
      }}
    >
      <Link
        className={clsx(
          styles['primary-link'],
          props.className && props.className
        )}
        href={props.href}
        id="link"
      >
        {props.children}
      </Link>
    </Box>
  );
};

export default memo(PrimaryLink);
