import { FC, ReactNode, memo } from 'react';
import { Box } from '@mui/material';

// Components
import Header from '../Header/Header';

// Styles
import styles from './Layout.module.scss';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = (props) => {
  return (
    <Box className={styles['layout']}>
      <Header />
      <div>{props.children}</div>
    </Box>
  );
};

export default memo(Layout);
