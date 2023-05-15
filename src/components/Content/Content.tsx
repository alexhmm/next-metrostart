import { FC, ReactNode, memo } from 'react';
import { Box } from '@mui/material';

// Components
import Header from '../Header/Header';
// Styles
import styles from './Content.module.scss';

type ContentProps = {
  children: ReactNode;
};

const Content: FC<ContentProps> = (props) => {
  return (
    <Box
      className={styles['content']}
      sx={{ backgroundColor: 'background.default' }}
    >
      <Header />
      {props.children}
    </Box>
  );
};

export default memo(Content);
