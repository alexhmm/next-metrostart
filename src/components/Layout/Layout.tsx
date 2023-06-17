import { FC, ReactNode, memo } from 'react';
import { Box } from '@mui/material';

// Components
import Footer from '../Footer/Footer';
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
      <main className={styles['layout-main']}>{props.children}</main>
      <Footer />
    </Box>
  );
};

export default memo(Layout);
