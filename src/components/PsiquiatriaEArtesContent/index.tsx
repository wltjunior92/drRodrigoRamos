import { ReactElement } from 'react';
import styles from './styles.module.scss';

interface PsiquiatriaEArtesContentProps {
  children: ReactElement | ReactElement[];
}

export function PsiquiatriaEArtesContent({ children }: PsiquiatriaEArtesContentProps) {
  return (
    <main className={styles.container}>
      <div>
        <h1>Psiquiatria e artes</h1>
      </div>
      <section className={`${styles.content} ${styles.content_mobile}`}>
        {children}
      </section>
    </main>
  )
}