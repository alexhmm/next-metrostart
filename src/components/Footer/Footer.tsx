import { FC, memo } from 'react';

// Styles
import styles from './Footer.module.scss';
import { Divider } from '@mui/material';

const Footer: FC = () => {
  return (
    <div className={styles['footer']}>
      <Divider />
      <div className={styles['footer-content']}>
        <span className="mt-4">Footer</span>
      </div>
    </div>
  );
};

export default memo(Footer);
