import { ReactElement } from 'react';
import styles from './styles.module.scss';

interface MidiasContentProps {
  titulo?: string;
  image?: string;
  children: ReactElement | ReactElement[];
}

export function MidiasContent({ children, image, titulo }: MidiasContentProps) {
  return (
    <main className={styles.container}>
      <div>
        <img src={image} alt="" />
        <h1>{titulo}</h1>
      </div>
      <section className={`${styles.content} ${styles.content_mobile}`}>
        {children}
      </section>
    </main>
  )
}