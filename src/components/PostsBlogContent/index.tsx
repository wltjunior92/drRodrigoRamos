import { ReactElement } from 'react';
import styles from './styles.module.scss';

interface PostsBlogContentProps {
  image?: string;
  children: ReactElement | ReactElement[];
}

export function PostsBlogContent({ children, image }: PostsBlogContentProps) {
  return (
    <main className={styles.container}>
      <div>
        <img src={image} />
        <h1>Posts mais recentes do blog</h1>
      </div>
      <section className={styles.content}>
        {children}
      </section>
      <nav>
        <a href="/blog">Veja mais {'>'}</a>
      </nav>
    </main>
  )
}