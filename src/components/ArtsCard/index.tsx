import { ReactElement } from "react";

import styles from './styles.module.scss';

interface ArtesCardProps {
  image?: string;
  children: ReactElement | ReactElement[];
}

export function ArtesCard({ children, image }: ArtesCardProps) {
  return (
    <main className={styles.artesCardContainer}>
      <img src={image} />
      <div />
      <section className={styles.content}>
        {children}
      </section>
    </main>
  )
}