import { FC, ReactNode, memo } from 'react';

// Component
import Content from '../Content/Content';
import Navigation from '../Navigation/Navigation';

// Styles
import styles from './Layout.module.scss';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = (props) => {
  return (
    <main className={styles['layout']}>
      <Navigation />
      <Content>{props.children}</Content>
    </main>
  );
};

export default memo(Layout);
