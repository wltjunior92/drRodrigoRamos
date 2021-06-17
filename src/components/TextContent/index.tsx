import { ReactElement } from 'react';
import styles from './styles.module.scss';

interface TextContentProps {
  banner: string;
  children: ReactElement | ReactElement[];
}

export function TextContent({ children, banner }: TextContentProps) {
  return (
    <div className={styles.container} style={{ backgroundImage: `url(${banner})` }}>
      {children}
    </div>
  )
}