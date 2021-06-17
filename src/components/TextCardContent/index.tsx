import { ReactElement } from 'react';
import styles from './styles.module.scss';

interface TextCardContentProps {
  titulo?: string;
  image?: string;
  children: ReactElement | ReactElement[];
}

export function TextCardContent({ children, titulo, image = '' }: TextCardContentProps) {
  return (
    <main className={styles.container}>
      <div>
        <img src={image} alt="" />
        <h1>{titulo}</h1>
      </div>
      <section className={styles.content}>
        {children}
      </section>
    </main>
  )
}